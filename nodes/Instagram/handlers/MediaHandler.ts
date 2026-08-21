import {
  IDataObject,
  IExecuteFunctions,
  NodeOperationError,
} from 'n8n-workflow';
import {
  getResolvedUserId,
  instagramApiRequest,
  instagramApiRequestAllItems,
  pollMediaContainerStatus,
  resolveParameterList,
} from '../GenericFunctions';

const ALL_SINGLE_MEDIA_FIELDS =
  'id,caption,media_type,media_url,permalink,shortcode,thumbnail_url,timestamp,username,like_count,comments_count,is_comment_enabled,children{id,media_type,media_url,thumbnail_url},alt_text';

const ALL_GET_ALL_MEDIA_FIELDS =
  'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count,is_comment_enabled';

interface CarouselItem {
  mediaType: string;
  url: string;
  altText?: string;
}

async function handleGetMedia(this: IExecuteFunctions, i: number): Promise<any> {
  const mediaId = this.getNodeParameter('mediaId', i) as string;
  const fields = resolveParameterList.call(this, i, ALL_SINGLE_MEDIA_FIELDS);
  return await instagramApiRequest.call(this, 'GET', `/${mediaId}`, {}, { fields });
}

async function handleGetAllMedia(this: IExecuteFunctions, i: number): Promise<any> {
  const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
  const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
  const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
  const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
  const fields = resolveParameterList.call(this, i, ALL_GET_ALL_MEDIA_FIELDS);

  const qs: IDataObject = { fields };
  if (additionalFields.since) qs.since = additionalFields.since;
  if (additionalFields.until) qs.until = additionalFields.until;

  return await instagramApiRequestAllItems.call(
    this,
    'data',
    'GET',
    `/${resolvedUserId}/media`,
    {},
    qs,
    limit,
  );
}

function parseUserTags(rawTags: unknown, nodeContext: any): IDataObject | undefined {
  if (!rawTags) return undefined;
  if (typeof rawTags === 'object') return rawTags as IDataObject;
  try {
    return JSON.parse(rawTags as string);
  } catch {
    throw new NodeOperationError(nodeContext, 'User Tags must be a valid JSON array string');
  }
}

async function handlePublishPhoto(this: IExecuteFunctions, i: number): Promise<any> {
  const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
  const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
  const imageUrl = this.getNodeParameter('imageUrl', i) as string;
  const caption = this.getNodeParameter('caption', i, '') as string;
  const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

  const containerBody: IDataObject = { image_url: imageUrl };
  if (caption) containerBody.caption = caption;
  if (additionalOptions.alt_text_wrap) containerBody.alt_text_wrap = additionalOptions.alt_text_wrap;
  if (additionalOptions.location_id) containerBody.location_id = additionalOptions.location_id;

  const parsedTags = parseUserTags(additionalOptions.user_tags, this.getNode());
  if (parsedTags) containerBody.user_tags = parsedTags;

  const container = await instagramApiRequest.call(
    this,
    'POST',
    `/${resolvedUserId}/media`,
    containerBody,
  );

  return await instagramApiRequest.call(this, 'POST', `/${resolvedUserId}/media_publish`, {
    creation_id: container.id,
  });
}

async function handlePublishVideo(this: IExecuteFunctions, i: number): Promise<any> {
  const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
  const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
  const videoUrl = this.getNodeParameter('videoUrl', i) as string;
  const mediaType = this.getNodeParameter('mediaType', i, 'REELS') as string;
  const caption = this.getNodeParameter('caption', i, '') as string;
  const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

  const containerBody: IDataObject = {
    media_type: mediaType,
    video_url: videoUrl,
  };

  if (caption) containerBody.caption = caption;
  if (additionalOptions.cover_url) containerBody.cover_url = additionalOptions.cover_url;
  if (additionalOptions.thumb_offset) containerBody.thumb_offset = additionalOptions.thumb_offset;
  if (additionalOptions.location_id) containerBody.location_id = additionalOptions.location_id;
  if (additionalOptions.share_to_feed !== undefined) {
    containerBody.share_to_feed = additionalOptions.share_to_feed;
  }
  if (additionalOptions.audio_name) containerBody.audio_name = additionalOptions.audio_name;

  const container = await instagramApiRequest.call(
    this,
    'POST',
    `/${resolvedUserId}/media`,
    containerBody,
  );

  await pollMediaContainerStatus.call(this, container.id as string);

  return await instagramApiRequest.call(this, 'POST', `/${resolvedUserId}/media_publish`, {
    creation_id: container.id,
  });
}

async function createSingleCarouselItem(
  this: IExecuteFunctions,
  resolvedUserId: string,
  item: CarouselItem,
): Promise<string> {
  const isImage = item.mediaType === 'IMAGE';
  const itemBody: IDataObject = {
    is_carousel_item: true,
    ...(isImage
      ? { image_url: item.url, ...(item.altText ? { alt_text_wrap: item.altText } : {}) }
      : { media_type: 'VIDEO', video_url: item.url }),
  };

  const itemContainer = await instagramApiRequest.call(
    this,
    'POST',
    `/${resolvedUserId}/media`,
    itemBody,
  );

  if (!isImage) {
    await pollMediaContainerStatus.call(this, itemContainer.id as string);
  }

  return itemContainer.id as string;
}

async function handlePublishCarousel(this: IExecuteFunctions, i: number): Promise<any> {
  const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
  const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
  const caption = this.getNodeParameter('caption', i, '') as string;
  const carouselItems = this.getNodeParameter('carouselItems', i, {}) as {
    item?: CarouselItem[];
  };
  const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

  const itemsList = carouselItems.item || [];
  if (itemsList.length < 2 || itemsList.length > 10) {
    throw new NodeOperationError(
      this.getNode(),
      'Instagram Carousel requires between 2 and 10 media items.',
      { itemIndex: i },
    );
  }

  const childrenIds: string[] = [];
  for (const item of itemsList) {
    const containerId = await createSingleCarouselItem.call(this, resolvedUserId, item);
    childrenIds.push(containerId);
  }

  const carouselBody: IDataObject = {
    media_type: 'CAROUSEL',
    children: childrenIds.join(','),
  };

  if (caption) carouselBody.caption = caption;
  if (additionalOptions.location_id) carouselBody.location_id = additionalOptions.location_id;

  const carouselContainer = await instagramApiRequest.call(
    this,
    'POST',
    `/${resolvedUserId}/media`,
    carouselBody,
  );

  return await instagramApiRequest.call(this, 'POST', `/${resolvedUserId}/media_publish`, {
    creation_id: carouselContainer.id,
  });
}

async function handlePublishStory(this: IExecuteFunctions, i: number): Promise<any> {
  const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
  const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
  const storyMediaType = this.getNodeParameter('storyMediaType', i, 'IMAGE') as string;
  const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;

  const isImage = storyMediaType === 'IMAGE';
  const storyBody: IDataObject = {
    media_type: 'STORIES',
    ...(isImage ? { image_url: mediaUrl } : { video_url: mediaUrl }),
  };

  const container = await instagramApiRequest.call(
    this,
    'POST',
    `/${resolvedUserId}/media`,
    storyBody,
  );

  if (!isImage) {
    await pollMediaContainerStatus.call(this, container.id as string);
  }

  return await instagramApiRequest.call(this, 'POST', `/${resolvedUserId}/media_publish`, {
    creation_id: container.id,
  });
}

async function handleDeleteMedia(this: IExecuteFunctions, i: number): Promise<any> {
  const mediaId = this.getNodeParameter('mediaId', i) as string;
  return await instagramApiRequest.call(this, 'DELETE', `/${mediaId}`);
}

const mediaOperationHandlers: Record<
  string,
  (this: IExecuteFunctions, i: number) => Promise<any>
> = {
  get: handleGetMedia,
  getAll: handleGetAllMedia,
  publishPhoto: handlePublishPhoto,
  publishVideo: handlePublishVideo,
  publishCarousel: handlePublishCarousel,
  publishStory: handlePublishStory,
  delete: handleDeleteMedia,
};

export async function handleMedia(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  const handler = mediaOperationHandlers[operation];
  if (!handler) {
    throw new NodeOperationError(this.getNode(), `Unsupported Media operation: ${operation}`, {
      itemIndex: i,
    });
  }
  return await handler.call(this, i);
}

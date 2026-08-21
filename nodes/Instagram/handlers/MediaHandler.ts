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
} from '../GenericFunctions';

export async function handleMedia(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  if (operation === 'get') {
    const mediaId = this.getNodeParameter('mediaId', i) as string;
    const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
    const allMediaFields =
      'id,caption,media_type,media_url,permalink,shortcode,thumbnail_url,timestamp,username,like_count,comments_count,is_comment_enabled,children{id,media_type,media_url,thumbnail_url},alt_text';
    const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
    const fields = fieldsMode === 'all' ? allMediaFields : selectedFields || allMediaFields;

    return await instagramApiRequest.call(
      this,
      'GET',
      `/${mediaId}`,
      {},
      { fields },
    );
  }

  if (operation === 'getAll') {
    const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
    const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
    const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
    const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
    const allMediaFields =
      'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count,is_comment_enabled';
    const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
    const fields = fieldsMode === 'all' ? allMediaFields : selectedFields || allMediaFields;

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

  if (operation === 'publishPhoto') {
    const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
    const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
    const imageUrl = this.getNodeParameter('imageUrl', i) as string;
    const caption = this.getNodeParameter('caption', i, '') as string;
    const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

    const containerBody: IDataObject = {
      image_url: imageUrl,
    };

    if (caption) containerBody.caption = caption;
    if (additionalOptions.alt_text_wrap) containerBody.alt_text_wrap = additionalOptions.alt_text_wrap;
    if (additionalOptions.location_id) containerBody.location_id = additionalOptions.location_id;
    if (additionalOptions.user_tags) {
      try {
        containerBody.user_tags =
          typeof additionalOptions.user_tags === 'string'
            ? JSON.parse(additionalOptions.user_tags as string)
            : additionalOptions.user_tags;
      } catch {
        throw new NodeOperationError(this.getNode(), 'User Tags must be a valid JSON array string');
      }
    }

    // Step 1: Create Container
    const container = await instagramApiRequest.call(
      this,
      'POST',
      `/${resolvedUserId}/media`,
      containerBody,
    );

    // Step 2: Publish Container
    return await instagramApiRequest.call(
      this,
      'POST',
      `/${resolvedUserId}/media_publish`,
      {
        creation_id: container.id,
      },
    );
  }

  if (operation === 'publishVideo') {
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

    // Step 1: Create Video Container
    const container = await instagramApiRequest.call(
      this,
      'POST',
      `/${resolvedUserId}/media`,
      containerBody,
    );

    // Step 2: Poll status until FINISHED
    await pollMediaContainerStatus.call(this, container.id as string);

    // Step 3: Publish Container
    return await instagramApiRequest.call(
      this,
      'POST',
      `/${resolvedUserId}/media_publish`,
      {
        creation_id: container.id,
      },
    );
  }

  if (operation === 'publishCarousel') {
    const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
    const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
    const caption = this.getNodeParameter('caption', i, '') as string;
    const carouselItems = this.getNodeParameter('carouselItems', i, {}) as {
      item?: Array<{ mediaType: string; url: string; altText?: string }>;
    };
    const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

    const itemsList = carouselItems.item || [];
    if (itemsList.length < 2 || itemsList.length > 10) {
      throw new NodeOperationError(
        this.getNode(),
        'Instagram Carousel requires between 2 and 10 media items.',
      );
    }

    // Step 1: Create individual item containers
    const childrenIds: string[] = [];
    for (const item of itemsList) {
      const itemBody: IDataObject = {
        is_carousel_item: true,
      };

      if (item.mediaType === 'IMAGE') {
        itemBody.image_url = item.url;
        if (item.altText) itemBody.alt_text_wrap = item.altText;
      } else {
        itemBody.media_type = 'VIDEO';
        itemBody.video_url = item.url;
      }

      const itemContainer = await instagramApiRequest.call(
        this,
        'POST',
        `/${resolvedUserId}/media`,
        itemBody,
      );

      if (item.mediaType === 'VIDEO') {
        await pollMediaContainerStatus.call(this, itemContainer.id as string);
      }

      childrenIds.push(itemContainer.id as string);
    }

    // Step 2: Create Carousel Parent Container
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

    // Step 3: Publish Carousel
    return await instagramApiRequest.call(
      this,
      'POST',
      `/${resolvedUserId}/media_publish`,
      {
        creation_id: carouselContainer.id,
      },
    );
  }

  if (operation === 'publishStory') {
    const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
    const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
    const storyMediaType = this.getNodeParameter('storyMediaType', i, 'IMAGE') as string;
    const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;

    const storyBody: IDataObject = {
      media_type: 'STORIES',
    };

    if (storyMediaType === 'IMAGE') {
      storyBody.image_url = mediaUrl;
    } else {
      storyBody.video_url = mediaUrl;
    }

    // Step 1: Create Story Container
    const container = await instagramApiRequest.call(
      this,
      'POST',
      `/${resolvedUserId}/media`,
      storyBody,
    );

    if (storyMediaType === 'VIDEO') {
      await pollMediaContainerStatus.call(this, container.id as string);
    }

    // Step 2: Publish Story
    return await instagramApiRequest.call(
      this,
      'POST',
      `/${resolvedUserId}/media_publish`,
      {
        creation_id: container.id,
      },
    );
  }

  if (operation === 'delete') {
    const mediaId = this.getNodeParameter('mediaId', i) as string;
    return await instagramApiRequest.call(
      this,
      'DELETE',
      `/${mediaId}`,
    );
  }

  return undefined;
}

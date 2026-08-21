import { IDataObject, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import {
  getResolvedUserId,
  instagramApiRequest,
  instagramApiRequestAllItems,
} from '../GenericFunctions';

async function handleGetMentionedMedia(this: IExecuteFunctions, i: number): Promise<any> {
  const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
  const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
  const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
  const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);

  return await instagramApiRequestAllItems.call(
    this,
    'data',
    'GET',
    `/${resolvedUserId}/tags`,
    {},
    { fields: 'id,caption,media_type,media_url,permalink,timestamp,username' },
    limit,
  );
}

async function handleGetMentionedComment(this: IExecuteFunctions, i: number): Promise<any> {
  const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
  const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
  const commentId = this.getNodeParameter('commentId', i) as string;

  return await instagramApiRequest.call(
    this,
    'GET',
    `/${resolvedUserId}/mentioned_comment`,
    {},
    {
      comment_id: commentId,
      fields: 'id,text,timestamp,media{id,permalink}',
    },
  );
}

async function handleReplyToMention(this: IExecuteFunctions, i: number): Promise<any> {
  const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
  const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
  const mentionTargetType = this.getNodeParameter('mentionTargetType', i) as string;
  const targetId = this.getNodeParameter('targetId', i) as string;
  const message = this.getNodeParameter('message', i) as string;

  const body: IDataObject = {
    message,
    ...(mentionTargetType === 'media' ? { media_id: targetId } : { comment_id: targetId }),
  };

  return await instagramApiRequest.call(
    this,
    'POST',
    `/${resolvedUserId}/mentions`,
    body,
  );
}

const mentionOperationHandlers: Record<
  string,
  (this: IExecuteFunctions, i: number) => Promise<any>
> = {
  getMentionedMedia: handleGetMentionedMedia,
  getMentionedComment: handleGetMentionedComment,
  replyToMention: handleReplyToMention,
};

export async function handleMention(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  const handler = mentionOperationHandlers[operation];
  if (!handler) {
    throw new NodeOperationError(this.getNode(), `Unsupported Mention operation: ${operation}`, {
      itemIndex: i,
    });
  }
  return await handler.call(this, i);
}

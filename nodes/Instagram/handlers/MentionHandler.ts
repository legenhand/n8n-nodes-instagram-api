import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import {
  getResolvedUserId,
  instagramApiRequest,
  instagramApiRequestAllItems,
} from '../GenericFunctions';

export async function handleMention(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
  const resolvedUserId = await getResolvedUserId.call(this, rawUserId);

  if (operation === 'getMentionedMedia') {
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

  if (operation === 'getMentionedComment') {
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

  if (operation === 'replyToMention') {
    const mentionTargetType = this.getNodeParameter('mentionTargetType', i) as string;
    const targetId = this.getNodeParameter('targetId', i) as string;
    const message = this.getNodeParameter('message', i) as string;

    const body: IDataObject = { message };
    if (mentionTargetType === 'media') {
      body.media_id = targetId;
    } else {
      body.comment_id = targetId;
    }

    return await instagramApiRequest.call(
      this,
      'POST',
      `/${resolvedUserId}/mentions`,
      body,
    );
  }

  return undefined;
}

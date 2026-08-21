import { IExecuteFunctions } from 'n8n-workflow';
import {
  instagramApiRequest,
  instagramApiRequestAllItems,
} from '../GenericFunctions';

export async function handleComment(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  if (operation === 'get') {
    const commentId = this.getNodeParameter('commentId', i) as string;
    const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
    const allCommentFields =
      'id,text,timestamp,like_count,hidden,replies_count,username,from{id,username}';
    const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
    const fields = fieldsMode === 'all' ? allCommentFields : selectedFields || allCommentFields;

    return await instagramApiRequest.call(
      this,
      'GET',
      `/${commentId}`,
      {},
      { fields },
    );
  }

  if (operation === 'getAll') {
    const mediaId = this.getNodeParameter('mediaId', i) as string;
    const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
    const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);
    const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
    const allCommentFields =
      'id,text,timestamp,like_count,hidden,replies_count,username,from{id,username}';
    const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
    const fields = fieldsMode === 'all' ? allCommentFields : selectedFields || allCommentFields;

    return await instagramApiRequestAllItems.call(
      this,
      'data',
      'GET',
      `/${mediaId}/comments`,
      {},
      { fields },
      limit,
    );
  }

  if (operation === 'getReplies') {
    const commentId = this.getNodeParameter('commentId', i) as string;
    const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
    const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);
    const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
    const allCommentFields =
      'id,text,timestamp,like_count,hidden,replies_count,username,from{id,username}';
    const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
    const fields = fieldsMode === 'all' ? allCommentFields : selectedFields || allCommentFields;

    return await instagramApiRequestAllItems.call(
      this,
      'data',
      'GET',
      `/${commentId}/replies`,
      {},
      { fields },
      limit,
    );
  }

  if (operation === 'create') {
    const mediaId = this.getNodeParameter('mediaId', i) as string;
    const message = this.getNodeParameter('message', i) as string;

    return await instagramApiRequest.call(
      this,
      'POST',
      `/${mediaId}/comments`,
      { message },
    );
  }

  if (operation === 'reply') {
    const commentId = this.getNodeParameter('commentId', i) as string;
    const message = this.getNodeParameter('message', i) as string;

    return await instagramApiRequest.call(
      this,
      'POST',
      `/${commentId}/replies`,
      { message },
    );
  }

  if (operation === 'delete') {
    const commentId = this.getNodeParameter('commentId', i) as string;

    return await instagramApiRequest.call(
      this,
      'DELETE',
      `/${commentId}`,
    );
  }

  if (operation === 'hide') {
    const commentId = this.getNodeParameter('commentId', i) as string;
    const hide = this.getNodeParameter('hide', i, true) as boolean;

    return await instagramApiRequest.call(
      this,
      'POST',
      `/${commentId}`,
      { hide },
    );
  }

  return undefined;
}

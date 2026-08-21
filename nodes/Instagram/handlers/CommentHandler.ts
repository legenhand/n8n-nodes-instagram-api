import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import {
  instagramApiRequest,
  instagramApiRequestAllItems,
  resolveParameterList,
} from '../GenericFunctions';

const ALL_COMMENT_FIELDS =
  'id,text,timestamp,like_count,hidden,replies_count,username,from{id,username}';

async function handleGetComment(this: IExecuteFunctions, i: number): Promise<any> {
  const commentId = this.getNodeParameter('commentId', i) as string;
  const fields = resolveParameterList.call(this, i, ALL_COMMENT_FIELDS);
  return await instagramApiRequest.call(this, 'GET', `/${commentId}`, {}, { fields });
}

async function handleGetAllComments(this: IExecuteFunctions, i: number): Promise<any> {
  const mediaId = this.getNodeParameter('mediaId', i) as string;
  const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
  const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);
  const fields = resolveParameterList.call(this, i, ALL_COMMENT_FIELDS);

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

async function handleGetCommentReplies(this: IExecuteFunctions, i: number): Promise<any> {
  const commentId = this.getNodeParameter('commentId', i) as string;
  const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
  const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);
  const fields = resolveParameterList.call(this, i, ALL_COMMENT_FIELDS);

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

async function handleCreateComment(this: IExecuteFunctions, i: number): Promise<any> {
  const mediaId = this.getNodeParameter('mediaId', i) as string;
  const message = this.getNodeParameter('message', i) as string;
  return await instagramApiRequest.call(this, 'POST', `/${mediaId}/comments`, { message });
}

async function handleReplyComment(this: IExecuteFunctions, i: number): Promise<any> {
  const commentId = this.getNodeParameter('commentId', i) as string;
  const message = this.getNodeParameter('message', i) as string;
  return await instagramApiRequest.call(this, 'POST', `/${commentId}/replies`, { message });
}

async function handleDeleteComment(this: IExecuteFunctions, i: number): Promise<any> {
  const commentId = this.getNodeParameter('commentId', i) as string;
  return await instagramApiRequest.call(this, 'DELETE', `/${commentId}`);
}

async function handleHideComment(this: IExecuteFunctions, i: number): Promise<any> {
  const commentId = this.getNodeParameter('commentId', i) as string;
  const hide = this.getNodeParameter('hide', i, true) as boolean;
  return await instagramApiRequest.call(this, 'POST', `/${commentId}`, { hide });
}

const commentOperationHandlers: Record<
  string,
  (this: IExecuteFunctions, i: number) => Promise<any>
> = {
  get: handleGetComment,
  getAll: handleGetAllComments,
  getReplies: handleGetCommentReplies,
  create: handleCreateComment,
  reply: handleReplyComment,
  delete: handleDeleteComment,
  hide: handleHideComment,
};

export async function handleComment(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  const handler = commentOperationHandlers[operation];
  if (!handler) {
    throw new NodeOperationError(this.getNode(), `Unsupported Comment operation: ${operation}`, {
      itemIndex: i,
    });
  }
  return await handler.call(this, i);
}

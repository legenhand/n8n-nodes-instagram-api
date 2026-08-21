import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import {
  instagramApiRequest,
  instagramApiRequestAllItems,
} from '../GenericFunctions';

async function handleSendTextMessage(this: IExecuteFunctions, i: number): Promise<any> {
  const recipientId = this.getNodeParameter('recipientId', i) as string;
  const text = this.getNodeParameter('text', i) as string;

  return await instagramApiRequest.call(this, 'POST', '/me/messages', {
    recipient: { id: recipientId },
    message: { text },
  });
}

async function handleSendMediaMessage(this: IExecuteFunctions, i: number): Promise<any> {
  const recipientId = this.getNodeParameter('recipientId', i) as string;
  const attachmentType = this.getNodeParameter('attachmentType', i) as string;
  const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;

  return await instagramApiRequest.call(this, 'POST', '/me/messages', {
    recipient: { id: recipientId },
    message: {
      attachment: {
        type: attachmentType,
        payload: {
          url: mediaUrl,
          is_reusable: true,
        },
      },
    },
  });
}

async function handleGetConversations(this: IExecuteFunctions, i: number): Promise<any> {
  const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
  const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);

  return await instagramApiRequestAllItems.call(
    this,
    'data',
    'GET',
    '/me/conversations',
    {},
    { fields: 'id,updated_time,participants' },
    limit,
  );
}

async function handleGetMessages(this: IExecuteFunctions, i: number): Promise<any> {
  const conversationId = this.getNodeParameter('conversationId', i) as string;
  const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
  const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);

  return await instagramApiRequestAllItems.call(
    this,
    'data',
    'GET',
    `/${conversationId}/messages`,
    {},
    { fields: 'id,created_time,from,to,message,attachments' },
    limit,
  );
}

const messageOperationHandlers: Record<
  string,
  (this: IExecuteFunctions, i: number) => Promise<any>
> = {
  sendText: handleSendTextMessage,
  sendMedia: handleSendMediaMessage,
  getConversations: handleGetConversations,
  getMessages: handleGetMessages,
};

export async function handleMessage(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  const handler = messageOperationHandlers[operation];
  if (!handler) {
    throw new NodeOperationError(this.getNode(), `Unsupported Message operation: ${operation}`, {
      itemIndex: i,
    });
  }
  return await handler.call(this, i);
}

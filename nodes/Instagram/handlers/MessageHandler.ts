import { IExecuteFunctions } from 'n8n-workflow';
import {
  instagramApiRequest,
  instagramApiRequestAllItems,
} from '../GenericFunctions';

export async function handleMessage(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  if (operation === 'sendText') {
    const recipientId = this.getNodeParameter('recipientId', i) as string;
    const text = this.getNodeParameter('text', i) as string;

    return await instagramApiRequest.call(
      this,
      'POST',
      '/me/messages',
      {
        recipient: { id: recipientId },
        message: { text },
      },
    );
  }

  if (operation === 'sendMedia') {
    const recipientId = this.getNodeParameter('recipientId', i) as string;
    const attachmentType = this.getNodeParameter('attachmentType', i) as string;
    const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;

    return await instagramApiRequest.call(
      this,
      'POST',
      '/me/messages',
      {
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
      },
    );
  }

  if (operation === 'getConversations') {
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

  if (operation === 'getMessages') {
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

  return undefined;
}

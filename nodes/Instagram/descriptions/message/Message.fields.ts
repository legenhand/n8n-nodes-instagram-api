import { INodeProperties } from 'n8n-workflow';

export const messageFields: INodeProperties[] = [
  // ----------------------------------
  //      message: sendText / sendMedia
  // ----------------------------------
  {
    displayName: 'Recipient ID (IGSID)',
    name: 'recipientId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['sendText', 'sendMedia'],
      },
    },
    description: 'Instagram-Scoped User ID (IGSID) of the recipient',
  },
  {
    displayName: 'Text',
    name: 'text',
    type: 'string',
    typeOptions: {
      rows: 3,
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['sendText'],
      },
    },
    description: 'Text content of the message to send',
  },
  {
    displayName: 'Attachment Type',
    name: 'attachmentType',
    type: 'options',
    options: [
      { name: 'Image', value: 'image' },
      { name: 'Video', value: 'video' },
      { name: 'Audio', value: 'audio' },
      { name: 'File', value: 'file' },
    ],
    default: 'image',
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['sendMedia'],
      },
    },
    description: 'Type of media attachment to send',
  },
  {
    displayName: 'Media URL',
    name: 'mediaUrl',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['sendMedia'],
      },
    },
    description: 'Public URL of the media file to send',
  },

  // ----------------------------------
  //      message: getMessages
  // ----------------------------------
  {
    displayName: 'Conversation ID',
    name: 'conversationId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['getMessages'],
      },
    },
    description: 'The ID of the conversation thread',
  },

  // ----------------------------------
  //      message: pagination
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['getConversations', 'getMessages'],
      },
    },
    description: 'Whether to return all results or easily limit to a specific number',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    typeOptions: {
      minValue: 1,
    },
    default: 50,
    displayOptions: {
      show: {
        resource: ['message'],
        operation: ['getConversations', 'getMessages'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
];

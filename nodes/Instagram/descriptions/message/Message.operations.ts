import { INodeProperties } from 'n8n-workflow';

export const messageOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['message'],
      },
    },
    options: [
      {
        name: 'Get Conversations',
        value: 'getConversations',
        description: 'Get list of active direct message conversations',
        action: 'Get DM conversations',
      },
      {
        name: 'Get Messages in Conversation',
        value: 'getMessages',
        description: 'Get messages from a specific conversation',
        action: 'Get messages from conversation',
      },
      {
        name: 'Send Media Message',
        value: 'sendMedia',
        description: 'Send an image, video, or audio file as a direct message (DM)',
        action: 'Send a media DM',
      },
      {
        name: 'Send Text Message',
        value: 'sendText',
        description: 'Send a text direct message (DM) to an Instagram user',
        action: 'Send a text DM',
      },
    ],
    default: 'sendText',
  },
];

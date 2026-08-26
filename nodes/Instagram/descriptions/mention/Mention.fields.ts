import { INodeProperties } from 'n8n-workflow';

export const mentionFields: INodeProperties[] = [
  // ----------------------------------
  //      mention: userId
  // ----------------------------------
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    default: 'me',
    displayOptions: {
      show: {
        resource: ['mention'],
      },
    },
    description: 'The Instagram User ID (or "me" for authenticated user)',
  },

  // ----------------------------------
  //      mention: getMentionedComment
  // ----------------------------------
  {
    displayName: 'Comment ID',
    name: 'commentId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['mention'],
        operation: ['getMentionedComment'],
      },
    },
    description: 'The ID of the comment mentioning your account',
  },

  // ----------------------------------
  //      mention: replyToMention
  // ----------------------------------
  {
    displayName: 'Mention Target Type',
    name: 'mentionTargetType',
    type: 'options',
    options: [
      { name: 'Caption Mention (Media ID)', value: 'media' },
      { name: 'Comment Mention (Comment ID)', value: 'comment' },
    ],
    default: 'media',
    displayOptions: {
      show: {
        resource: ['mention'],
        operation: ['replyToMention'],
      },
    },
    description: 'Whether the mention was in a post caption or in a comment',
  },
  {
    displayName: 'Target ID',
    name: 'targetId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['mention'],
        operation: ['replyToMention'],
      },
    },
    description: 'The Media ID (for caption mention) or Comment ID (for comment mention)',
  },
  {
    displayName: 'Message',
    name: 'message',
    type: 'string',
    typeOptions: {
      rows: 3,
    },
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['mention'],
        operation: ['replyToMention'],
      },
    },
    description: 'The comment text to post in response to the mention',
  },

  // ----------------------------------
  //      mention: pagination
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['mention'],
        operation: ['getMentionedMedia'],
      },
    },
    description: 'Whether to return all results or only up to a given limit',
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
        resource: ['mention'],
        operation: ['getMentionedMedia'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
];

import { INodeProperties } from 'n8n-workflow';

export const commentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['comment'],
      },
    },
    options: [
      {
        name: 'Get Comment',
        value: 'get',
        description: 'Get details of a specific comment',
        action: 'Get a comment',
      },
      {
        name: 'Get Many Comments',
        value: 'getAll',
        description: 'Get all top-level comments on a media item',
        action: 'Get many comments',
      },
      {
        name: 'Get Replies',
        value: 'getReplies',
        description: 'Get replies to a specific comment',
        action: 'Get comment replies',
      },
      {
        name: 'Create Comment',
        value: 'create',
        description: 'Post a new comment on a media item',
        action: 'Create a comment',
      },
      {
        name: 'Reply to Comment',
        value: 'reply',
        description: 'Reply to an existing comment',
        action: 'Reply to a comment',
      },
      {
        name: 'Delete Comment',
        value: 'delete',
        description: 'Delete a comment',
        action: 'Delete a comment',
      },
      {
        name: 'Hide / Unhide Comment',
        value: 'hide',
        description: 'Hide or unhide a comment on your post',
        action: 'Hide or unhide a comment',
      },
    ],
    default: 'getAll',
  },
];

export const commentFields: INodeProperties[] = [
  // ----------------------------------
  //  comment: get / delete / hide / reply / getReplies
  // ----------------------------------
  {
    displayName: 'Comment ID',
    name: 'commentId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['comment'],
        operation: ['get', 'delete', 'hide', 'reply', 'getReplies'],
      },
    },
    description: 'The ID of the Instagram comment',
  },

  // ----------------------------------
  //      comment: getAll / create
  // ----------------------------------
  {
    displayName: 'Media ID',
    name: 'mediaId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['comment'],
        operation: ['getAll', 'create'],
      },
    },
    description: 'The ID of the media post',
  },

  // ----------------------------------
  //      comment: create / reply message
  // ----------------------------------
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
        resource: ['comment'],
        operation: ['create', 'reply'],
      },
    },
    description: 'The text of the comment or reply',
  },

  // ----------------------------------
  //      comment: hide boolean
  // ----------------------------------
  {
    displayName: 'Hide Comment',
    name: 'hide',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: ['comment'],
        operation: ['hide'],
      },
    },
    description: 'Whether to hide the comment (true) or unhide it (false)',
  },

  // ----------------------------------
  //      comment: getAll pagination
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['comment'],
        operation: ['getAll', 'getReplies'],
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
        resource: ['comment'],
        operation: ['getAll', 'getReplies'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },

  // ----------------------------------
  //      comment: fields selection
  // ----------------------------------
  {
    displayName: 'Fields',
    name: 'fields',
    type: 'multiOptions',
    options: [
      { name: 'Hidden', value: 'hidden' },
      { name: 'ID', value: 'id' },
      { name: 'Like Count', value: 'like_count' },
      { name: 'Replies Count', value: 'replies_count' },
      { name: 'Text', value: 'text' },
      { name: 'Timestamp', value: 'timestamp' },
      { name: 'User / From', value: 'from{id,username}' },
      { name: 'Username', value: 'username' },
    ],
    default: ['id', 'text', 'timestamp', 'like_count', 'hidden', 'from{id,username}'],
    displayOptions: {
      show: {
        resource: ['comment'],
        operation: ['get', 'getAll', 'getReplies'],
      },
    },
    description: 'Specific fields to return for each comment',
  },
];

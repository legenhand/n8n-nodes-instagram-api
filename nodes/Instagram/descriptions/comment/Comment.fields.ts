import { INodeProperties } from 'n8n-workflow';

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
    displayName: 'Fields to Retrieve',
    name: 'fieldsMode',
    type: 'options',
    options: [
      {
        name: 'All Fields (Recommended)',
        value: 'all',
        description: 'Retrieve all available comment fields',
      },
      {
        name: 'Selected Fields',
        value: 'selected',
        description: 'Choose specific fields to retrieve',
      },
    ],
    default: 'all',
    displayOptions: {
      show: {
        resource: ['comment'],
        operation: ['get', 'getAll', 'getReplies'],
      },
    },
    description: 'Whether to retrieve all available fields or pick specific fields',
  },
  {
    displayName: 'Fields',
    name: 'fields',
    type: 'multiOptions',
    options: [
      { name: 'From / User', value: 'from{id,username}' },
      { name: 'Hidden', value: 'hidden' },
      { name: 'ID', value: 'id' },
      { name: 'Like Count', value: 'like_count' },
      { name: 'Replies Count', value: 'replies_count' },
      { name: 'Text', value: 'text' },
      { name: 'Timestamp', value: 'timestamp' },
      { name: 'Username', value: 'username' },
    ],
    default: ['id', 'text', 'timestamp', 'like_count', 'hidden', 'from{id,username}'],
    displayOptions: {
      show: {
        resource: ['comment'],
        operation: ['get', 'getAll', 'getReplies'],
        fieldsMode: ['selected'],
      },
    },
    description: 'Specific fields to return for each comment',
  },
];

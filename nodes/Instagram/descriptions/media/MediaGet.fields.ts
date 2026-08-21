import { INodeProperties } from 'n8n-workflow';

export const mediaGetFields: INodeProperties[] = [
  // ----------------------------------
  //         media: get / delete
  // ----------------------------------
  {
    displayName: 'Media ID',
    name: 'mediaId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['get', 'delete'],
      },
    },
    description: 'The ID of the media post',
  },
  {
    displayName: 'Fields to Retrieve',
    name: 'fieldsMode',
    type: 'options',
    options: [
      {
        name: 'All Fields (Recommended)',
        value: 'all',
        description: 'Retrieve all available media fields',
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
        resource: ['media'],
        operation: ['get', 'getAll'],
      },
    },
    description: 'Whether to retrieve all available fields or pick specific fields',
  },
  {
    displayName: 'Fields',
    name: 'fields',
    type: 'multiOptions',
    options: [
      { name: 'Alt Text', value: 'alt_text' },
      { name: 'Caption', value: 'caption' },
      { name: 'Children', value: 'children{id,media_type,media_url,thumbnail_url}' },
      { name: 'Comments Count', value: 'comments_count' },
      { name: 'ID', value: 'id' },
      { name: 'Is Comment Enabled', value: 'is_comment_enabled' },
      { name: 'Like Count', value: 'like_count' },
      { name: 'Media Type', value: 'media_type' },
      { name: 'Media URL', value: 'media_url' },
      { name: 'Permalink', value: 'permalink' },
      { name: 'Shortcode', value: 'shortcode' },
      { name: 'Thumbnail URL', value: 'thumbnail_url' },
      { name: 'Timestamp', value: 'timestamp' },
      { name: 'Username', value: 'username' },
    ],
    default: [
      'id',
      'caption',
      'media_type',
      'media_url',
      'permalink',
      'thumbnail_url',
      'timestamp',
      'like_count',
      'comments_count',
    ],
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['get', 'getAll'],
        fieldsMode: ['selected'],
      },
    },
    description: 'Fields to retrieve for the media item',
  },

  // ----------------------------------
  //         media: getAll
  // ----------------------------------
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    default: 'me',
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['getAll'],
      },
    },
    description: 'The Instagram User ID (or "me" for authenticated user)',
  },
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['getAll'],
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
        resource: ['media'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Since (Unix Timestamp)',
        name: 'since',
        type: 'number',
        default: 0,
        description: 'Lower bound timestamp for media created',
      },
      {
        displayName: 'Until (Unix Timestamp)',
        name: 'until',
        type: 'number',
        default: 0,
        description: 'Upper bound timestamp for media created',
      },
    ],
  },
];

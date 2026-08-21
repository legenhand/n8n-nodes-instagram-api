import { INodeProperties } from 'n8n-workflow';

export const mediaOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['media'],
      },
    },
    options: [
      {
        name: 'Get Media',
        value: 'get',
        description: 'Get details of a single media post',
        action: 'Get a media item',
      },
      {
        name: 'Get Many Media',
        value: 'getAll',
        description: 'Get all media items from an Instagram account',
        action: 'Get many media items',
      },
      {
        name: 'Publish Photo',
        value: 'publishPhoto',
        description: 'Publish a single image post to Instagram feed',
        action: 'Publish a photo',
      },
      {
        name: 'Publish Video / Reel',
        value: 'publishVideo',
        description: 'Publish a video or Reel to Instagram',
        action: 'Publish a video or reel',
      },
      {
        name: 'Publish Carousel',
        value: 'publishCarousel',
        description: 'Publish a multi-item carousel post (photos and videos)',
        action: 'Publish a carousel',
      },
      {
        name: 'Publish Story',
        value: 'publishStory',
        description: 'Publish a Story (photo or video)',
        action: 'Publish a story',
      },
      {
        name: 'Delete Media',
        value: 'delete',
        description: 'Delete a media post',
        action: 'Delete a media item',
      },
    ],
    default: 'getAll',
  },
];

export const mediaFields: INodeProperties[] = [
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
        operation: ['get'],
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

  // ----------------------------------
  //      media: publishPhoto
  // ----------------------------------
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    default: 'me',
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['publishPhoto', 'publishVideo', 'publishCarousel', 'publishStory'],
      },
    },
    description: 'The Instagram User ID (or "me" for authenticated user)',
  },
  {
    displayName: 'Image URL',
    name: 'imageUrl',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['publishPhoto'],
      },
    },
    description: 'Public URL of the image to publish (must be hosted on a public server)',
  },
  {
    displayName: 'Caption',
    name: 'caption',
    type: 'string',
    typeOptions: {
      rows: 4,
    },
    default: '',
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['publishPhoto', 'publishVideo', 'publishCarousel'],
      },
    },
    description: 'Caption text for the post, including hashtags',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['publishPhoto'],
      },
    },
    options: [
      {
        displayName: 'Alt Text',
        name: 'alt_text_wrap',
        type: 'string',
        default: '',
        description: 'Accessibility custom alt text for the photo',
      },
      {
        displayName: 'Location ID',
        name: 'location_id',
        type: 'string',
        default: '',
        description: 'Facebook Page / Location ID to tag location in the post',
      },
      {
        displayName: 'User Tags (JSON)',
        name: 'user_tags',
        type: 'string',
        default: '',
        description: 'Array of user tags formatted as JSON string: [{"username":"example","x":0.5,"y":0.5}]',
      },
    ],
  },

  // ----------------------------------
  //      media: publishVideo
  // ----------------------------------
  {
    displayName: 'Video URL',
    name: 'videoUrl',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['publishVideo'],
      },
    },
    description: 'Public URL of the video file (e.g. MP4/MOV, must be publicly accessible)',
  },
  {
    displayName: 'Media Type',
    name: 'mediaType',
    type: 'options',
    options: [
      { name: 'Reels', value: 'REELS' },
      { name: 'Video Post', value: 'VIDEO' },
    ],
    default: 'REELS',
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['publishVideo'],
      },
    },
    description: 'Whether to publish as Instagram Reels or standard Video post',
  },
  {
    displayName: 'Additional Video Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['publishVideo'],
      },
    },
    options: [
      {
        displayName: 'Share To Feed (Reels)',
        name: 'share_to_feed',
        type: 'boolean',
        default: true,
        description: 'Whether the Reel should also be shown on the main profile grid / feed',
      },
      {
        displayName: 'Cover URL',
        name: 'cover_url',
        type: 'string',
        default: '',
        description: 'URL of the custom cover image for the video/reel',
      },
      {
        displayName: 'Thumb Offset (ms)',
        name: 'thumb_offset',
        type: 'number',
        default: 0,
        description: 'Frame timestamp in milliseconds to use as the thumbnail image',
      },
      {
        displayName: 'Audio Name',
        name: 'audio_name',
        type: 'string',
        default: '',
        description: 'Custom audio title for Reels (if original audio)',
      },
      {
        displayName: 'Location ID',
        name: 'location_id',
        type: 'string',
        default: '',
        description: 'Location ID to attach to the post',
      },
    ],
  },

  // ----------------------------------
  //      media: publishCarousel
  // ----------------------------------
  {
    displayName: 'Carousel Items',
    name: 'carouselItems',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    required: true,
    default: {},
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['publishCarousel'],
      },
    },
    description: 'Add 2 to 10 photos or videos to include in the carousel',
    options: [
      {
        name: 'items',
        displayName: 'Item',
        values: [
          {
            displayName: 'Media Type',
            name: 'mediaType',
            type: 'options',
            options: [
              { name: 'Photo', value: 'IMAGE' },
              { name: 'Video', value: 'VIDEO' },
            ],
            default: 'IMAGE',
            description: 'Type of media item',
          },
          {
            displayName: 'Media URL',
            name: 'url',
            type: 'string',
            required: true,
            default: '',
            description: 'Public URL of the photo or video',
          },
          {
            displayName: 'Alt Text',
            name: 'altText',
            type: 'string',
            default: '',
            description: 'Custom alt text for image',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Additional Carousel Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['publishCarousel'],
      },
    },
    options: [
      {
        displayName: 'Location ID',
        name: 'location_id',
        type: 'string',
        default: '',
        description: 'Location ID to attach to the post',
      },
    ],
  },

  // ----------------------------------
  //      media: publishStory
  // ----------------------------------
  {
    displayName: 'Media Type',
    name: 'storyMediaType',
    type: 'options',
    options: [
      { name: 'Photo', value: 'IMAGE' },
      { name: 'Video', value: 'VIDEO' },
    ],
    default: 'IMAGE',
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['publishStory'],
      },
    },
    description: 'Type of Story to publish',
  },
  {
    displayName: 'Media URL',
    name: 'mediaUrl',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['media'],
        operation: ['publishStory'],
      },
    },
    description: 'Public URL of the photo or video for the story (9:16 aspect ratio recommended)',
  },
];

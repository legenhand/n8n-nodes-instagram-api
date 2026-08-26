import { INodeProperties } from 'n8n-workflow';

export const mediaPublishFields: INodeProperties[] = [
  // ----------------------------------
  //      media: publishPhoto / video / carousel / story User ID
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

  // ----------------------------------
  //      media: publishPhoto
  // ----------------------------------
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
        displayName: 'Audio Name',
        name: 'audio_name',
        type: 'string',
        default: '',
        description: 'Custom audio title for Reels (if original audio)',
      },
      {
        displayName: 'Cover URL',
        name: 'cover_url',
        type: 'string',
        default: '',
        description: 'URL of the custom cover image for the video/reel',
      },
      {
        displayName: 'Location ID',
        name: 'location_id',
        type: 'string',
        default: '',
        description: 'Location ID to attach to the post',
      },
      {
        displayName: 'Share to Feed (Reels)',
        name: 'share_to_feed',
        type: 'boolean',
        default: true,
        description: 'Whether the Reel should also be shown on the main profile grid / feed',
      },
      {
        displayName: 'Thumb Offset (Ms)',
        name: 'thumb_offset',
        type: 'number',
        default: 0,
        description: 'Frame timestamp in milliseconds to use as the thumbnail image',
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

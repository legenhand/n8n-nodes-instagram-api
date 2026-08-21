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

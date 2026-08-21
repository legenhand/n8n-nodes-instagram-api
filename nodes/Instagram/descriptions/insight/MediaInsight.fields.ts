import { INodeProperties } from 'n8n-workflow';

export const mediaInsightFields: INodeProperties[] = [
  {
    displayName: 'Media ID',
    name: 'mediaId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['insight'],
        operation: ['getMediaInsights'],
      },
    },
    description: 'The ID of the media post, Reel, or Story',
  },
  {
    displayName: 'Metrics to Retrieve',
    name: 'mediaMetricsMode',
    type: 'options',
    options: [
      {
        name: 'All Metrics (Select All)',
        value: 'all',
        description: 'Retrieve all available media metrics',
      },
      {
        name: 'Selected Metrics',
        value: 'selected',
        description: 'Choose specific metrics to retrieve',
      },
    ],
    default: 'all',
    displayOptions: {
      show: {
        resource: ['insight'],
        operation: ['getMediaInsights'],
      },
    },
    description: 'Whether to retrieve all metrics or pick specific metrics',
  },
  {
    displayName: 'Metrics',
    name: 'mediaMetrics',
    type: 'multiOptions',
    required: true,
    options: [
      { name: 'Comments', value: 'comments' },
      { name: 'Engagement', value: 'engagement' },
      { name: 'Follows', value: 'follows' },
      { name: 'Likes', value: 'likes' },
      { name: 'Plays (Reels)', value: 'plays' },
      { name: 'Profile Activity', value: 'profile_activity' },
      { name: 'Profile Visits', value: 'profile_visits' },
      { name: 'Reach', value: 'reach' },
      { name: 'Saved', value: 'saved' },
      { name: 'Shares', value: 'shares' },
      { name: 'Total Interactions', value: 'total_interactions' },
      { name: 'Video Views', value: 'video_views' },
      { name: 'Views', value: 'views' },
    ],
    default: [
      'reach',
      'views',
      'saved',
      'shares',
      'likes',
      'comments',
      'total_interactions',
      'plays',
      'profile_visits',
      'profile_activity',
      'follows',
    ],
    displayOptions: {
      show: {
        resource: ['insight'],
        operation: ['getMediaInsights'],
        mediaMetricsMode: ['selected'],
      },
    },
    description: 'Specific performance metrics to retrieve for this media item',
  },
];

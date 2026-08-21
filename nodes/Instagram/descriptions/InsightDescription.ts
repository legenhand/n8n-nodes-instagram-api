import { INodeProperties } from 'n8n-workflow';

export const insightOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['insight'],
      },
    },
    options: [
      {
        name: 'Get Account Insights',
        value: 'getAccountInsights',
        description: 'Get metrics and statistics for an Instagram business account',
        action: 'Get account insights',
      },
      {
        name: 'Get Media Insights',
        value: 'getMediaInsights',
        description: 'Get metrics and performance data for a specific media post, Reel, or Story',
        action: 'Get media insights',
      },
    ],
    default: 'getAccountInsights',
  },
];

export const insightFields: INodeProperties[] = [
  // ----------------------------------
  //      insight: getAccountInsights
  // ----------------------------------
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    default: 'me',
    displayOptions: {
      show: {
        resource: ['insight'],
        operation: ['getAccountInsights'],
      },
    },
    description: 'The Instagram User ID (or "me" for authenticated user)',
  },
  {
    displayName: 'Metrics',
    name: 'metrics',
    type: 'multiOptions',
    required: true,
    options: [
      { name: 'Accounts Engaged', value: 'accounts_engaged' },
      { name: 'Comments', value: 'comments' },
      { name: 'Follower Count', value: 'follower_count' },
      { name: 'Impressions', value: 'impressions' },
      { name: 'Likes', value: 'likes' },
      { name: 'Profile Views', value: 'profile_views' },
      { name: 'Reach', value: 'reach' },
      { name: 'Saves', value: 'saves' },
      { name: 'Shares', value: 'shares' },
      { name: 'Total Interactions', value: 'total_interactions' },
      { name: 'Website Clicks', value: 'website_clicks' },
    ],
    default: ['reach', 'impressions', 'accounts_engaged', 'total_interactions', 'profile_views'],
    displayOptions: {
      show: {
        resource: ['insight'],
        operation: ['getAccountInsights'],
      },
    },
    description: 'Metrics to query from Instagram Account Insights',
  },
  {
    displayName: 'Period',
    name: 'period',
    type: 'options',
    options: [
      { name: 'Day', value: 'day' },
      { name: 'Days 28', value: 'days_28' },
      { name: 'Lifetime', value: 'lifetime' },
      { name: 'Month', value: 'month' },
      { name: 'Total Over Range', value: 'total_over_range' },
      { name: 'Week', value: 'week' },
    ],
    default: 'day',
    displayOptions: {
      show: {
        resource: ['insight'],
        operation: ['getAccountInsights'],
      },
    },
    description: 'Aggregation period for the metric',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['insight'],
        operation: ['getAccountInsights'],
      },
    },
    options: [
      {
        displayName: 'Since (Unix Timestamp)',
        name: 'since',
        type: 'number',
        default: 0,
        description: 'Lower bound for the range of dates to return data for',
      },
      {
        displayName: 'Until (Unix Timestamp)',
        name: 'until',
        type: 'number',
        default: 0,
        description: 'Upper bound for the range of dates to return data for',
      },
      {
        displayName: 'Metric Type',
        name: 'metric_type',
        type: 'options',
        options: [
          { name: 'Default', value: 'default' },
          { name: 'Time Series', value: 'time_series' },
          { name: 'Total Value', value: 'total_value' },
        ],
        default: 'default',
        description: 'Format of the metric values',
      },
    ],
  },

  // ----------------------------------
  //      insight: getMediaInsights
  // ----------------------------------
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
    displayName: 'Metrics',
    name: 'mediaMetrics',
    type: 'multiOptions',
    required: true,
    options: [
      { name: 'Comments', value: 'comments' },
      { name: 'Engagement', value: 'engagement' },
      { name: 'Follows', value: 'follows' },
      { name: 'Impressions', value: 'impressions' },
      { name: 'Likes', value: 'likes' },
      { name: 'Plays (Reels)', value: 'plays' },
      { name: 'Profile Activity', value: 'profile_activity' },
      { name: 'Profile Visits', value: 'profile_visits' },
      { name: 'Reach', value: 'reach' },
      { name: 'Saved', value: 'saved' },
      { name: 'Shares', value: 'shares' },
      { name: 'Total Interactions', value: 'total_interactions' },
      { name: 'Video Views', value: 'video_views' },
    ],
    default: ['reach', 'saved', 'shares', 'total_interactions'],
    displayOptions: {
      show: {
        resource: ['insight'],
        operation: ['getMediaInsights'],
      },
    },
    description: 'Specific performance metrics to retrieve for this media item',
  },
];

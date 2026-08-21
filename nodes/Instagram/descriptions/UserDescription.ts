import { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['user'],
      },
    },
    options: [
      {
        name: 'Get Authenticated User Profile',
        value: 'getMe',
        description: 'Get profile information for the authenticated Instagram account',
        action: 'Get authenticated user profile',
      },
      {
        name: 'Get User Profile',
        value: 'get',
        description: 'Get profile information of a specific Instagram account by User ID',
        action: 'Get a user profile',
      },
      {
        name: 'Get User Insights',
        value: 'getInsights',
        description: 'Get metrics and insights for an Instagram account',
        action: 'Get user insights',
      },
    ],
    default: 'getMe',
  },
];

export const userFields: INodeProperties[] = [
  // ----------------------------------
  //         user: get
  // ----------------------------------
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['get'],
      },
    },
    description: 'The Instagram User ID to retrieve profile details for',
  },
  {
    displayName: 'Fields to Retrieve',
    name: 'fieldsMode',
    type: 'options',
    options: [
      {
        name: 'All Fields (Recommended)',
        value: 'all',
        description: 'Retrieve all available profile fields',
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
        resource: ['user'],
        operation: ['get', 'getMe'],
      },
    },
    description: 'Whether to retrieve all available fields or pick specific fields',
  },
  {
    displayName: 'Fields',
    name: 'fields',
    type: 'multiOptions',
    options: [
      { name: 'Account Type', value: 'account_type' },
      { name: 'Biography', value: 'biography' },
      { name: 'Followers Count', value: 'followers_count' },
      { name: 'Follows Count', value: 'follows_count' },
      { name: 'ID', value: 'id' },
      { name: 'Media Count', value: 'media_count' },
      { name: 'Name', value: 'name' },
      { name: 'Profile Picture URL', value: 'profile_picture_url' },
      { name: 'User ID', value: 'user_id' },
      { name: 'Username', value: 'username' },
      { name: 'Website', value: 'website' },
    ],
    default: ['id', 'user_id', 'username', 'name', 'account_type', 'profile_picture_url', 'followers_count', 'media_count', 'biography', 'website'],
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['get', 'getMe'],
        fieldsMode: ['selected'],
      },
    },
    description: 'Specific fields to return in the response',
  },

  // ----------------------------------
  //       user: getInsights
  // ----------------------------------
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    default: 'me',
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['getInsights'],
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
      { name: 'Content Views', value: 'content_views' },
      { name: 'Engaged Audience Demographics', value: 'engaged_audience_demographics' },
      { name: 'Follower Count', value: 'follower_count' },
      { name: 'Follower Demographics', value: 'follower_demographics' },
      { name: 'Follows and Unfollows', value: 'follows_and_unfollows' },
      { name: 'Likes', value: 'likes' },
      { name: 'Online Followers', value: 'online_followers' },
      { name: 'Profile Links Taps', value: 'profile_links_taps' },
      { name: 'Profile Views', value: 'profile_views' },
      { name: 'Quotes', value: 'quotes' },
      { name: 'Reach', value: 'reach' },
      { name: 'Reached Audience Demographics', value: 'reached_audience_demographics' },
      { name: 'Replies', value: 'replies' },
      { name: 'Reposts', value: 'reposts' },
      { name: 'Saves', value: 'saves' },
      { name: 'Shares', value: 'shares' },
      { name: 'Threads Clicks', value: 'threads_clicks' },
      { name: 'Threads Follower Demographics', value: 'threads_follower_demographics' },
      { name: 'Threads Followers', value: 'threads_followers' },
      { name: 'Threads Likes', value: 'threads_likes' },
      { name: 'Threads Replies', value: 'threads_replies' },
      { name: 'Threads Reposts', value: 'threads_reposts' },
      { name: 'Threads Views', value: 'threads_views' },
      { name: 'Total Interactions', value: 'total_interactions' },
      { name: 'Views', value: 'views' },
      { name: 'Website Clicks', value: 'website_clicks' },
    ],
    default: ['reach', 'views', 'accounts_engaged', 'total_interactions', 'profile_views'],
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['getInsights'],
      },
    },
    description: 'Metrics to query from Instagram Insights',
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
        resource: ['user'],
        operation: ['getInsights'],
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
        resource: ['user'],
        operation: ['getInsights'],
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
];

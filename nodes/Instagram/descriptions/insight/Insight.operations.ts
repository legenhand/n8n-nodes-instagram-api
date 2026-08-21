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

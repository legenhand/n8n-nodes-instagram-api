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

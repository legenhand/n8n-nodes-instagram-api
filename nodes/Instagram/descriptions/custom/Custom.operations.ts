import { INodeProperties } from 'n8n-workflow';

export const customOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['custom'],
      },
    },
    options: [
      {
        name: 'Custom Graph API Call',
        value: 'customApiCall',
        description: 'Send a custom authenticated HTTP request to the Instagram Graph API',
        action: 'Send a custom graph API request',
      },
    ],
    default: 'customApiCall',
  },
];

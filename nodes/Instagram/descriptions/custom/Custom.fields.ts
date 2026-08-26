import { INodeProperties } from 'n8n-workflow';

export const customFields: INodeProperties[] = [
  {
    displayName: 'HTTP Method',
    name: 'httpMethod',
    type: 'options',
    options: [
      { name: 'GET', value: 'GET' },
      { name: 'POST', value: 'POST' },
      { name: 'DELETE', value: 'DELETE' },
    ],
    default: 'GET',
    displayOptions: {
      show: {
        resource: ['custom'],
        operation: ['customApiCall'],
      },
    },
    description: 'The HTTP method to use for the API call',
  },
  {
    displayName: 'Endpoint Path',
    name: 'endpointPath',
    type: 'string',
    required: true,
    default: '/me',
    displayOptions: {
      show: {
        resource: ['custom'],
        operation: ['customApiCall'],
      },
    },
    description: 'The API endpoint path (e.g. /me, /me/media, /{user ID}/insights)',
  },
  {
    displayName: 'Query Parameters (JSON)',
    name: 'queryParamsJson',
    type: 'json',
    default: '{}',
    displayOptions: {
      show: {
        resource: ['custom'],
        operation: ['customApiCall'],
      },
    },
    description: 'Query parameters as a JSON object (e.g. {"fields": "username"})',
  },
  {
    displayName: 'Body Parameters (JSON)',
    name: 'bodyParamsJson',
    type: 'json',
    default: '{}',
    displayOptions: {
      show: {
        resource: ['custom'],
        operation: ['customApiCall'],
        httpMethod: ['POST'],
      },
    },
    description: 'Request body as a JSON object (for POST requests)',
  },
];

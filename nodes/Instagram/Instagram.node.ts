import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
} from 'n8n-workflow';

import {
  userFields,
  userOperations,
  mediaFields,
  mediaOperations,
  commentFields,
  commentOperations,
  messageFields,
  messageOperations,
  insightFields,
  insightOperations,
  mentionFields,
  mentionOperations,
  customFields,
  customOperations,
} from './descriptions';

import { handleUser } from './handlers/UserHandler';
import { handleMedia } from './handlers/MediaHandler';
import { handleComment } from './handlers/CommentHandler';
import { handleMessage } from './handlers/MessageHandler';
import { handleInsight } from './handlers/InsightHandler';
import { handleMention } from './handlers/MentionHandler';
import { handleCustom } from './handlers/CustomHandler';

const resourceHandlers: Record<
  string,
  (this: IExecuteFunctions, operation: string, index: number) => Promise<any>
> = {
  user: handleUser,
  media: handleMedia,
  comment: handleComment,
  message: handleMessage,
  insight: handleInsight,
  mention: handleMention,
  custom: handleCustom,
};

export class Instagram implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Instagram (Business Login)',
    name: 'instagram',
    icon: 'file:instagram.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description:
      'Interact with Instagram Graph API using Instagram Login (Publish Posts/Reels/Stories/Carousels, Manage Comments, Send DMs, Read Insights, and Mentions)',
    defaults: {
      name: 'Instagram (Business Login)',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'instagramOAuth2Api',
        required: true,
        displayOptions: {
          show: {
            authentication: ['oAuth2'],
          },
        },
      },
      {
        name: 'instagramApi',
        required: true,
        displayOptions: {
          show: {
            authentication: ['accessToken'],
          },
        },
      },
    ],
    properties: [
      {
        displayName: 'Authentication',
        name: 'authentication',
        type: 'options',
        options: [
          {
            name: 'OAuth2 (Business Login - Recommended)',
            value: 'oAuth2',
          },
          {
            name: 'Access Token (Long-Lived User Token)',
            value: 'accessToken',
          },
        ],
        default: 'oAuth2',
      },
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'User / Profile',
            value: 'user',
            description: 'Get authenticated user or target user profile details and insights',
          },
          {
            name: 'Media / Post',
            value: 'media',
            description: 'Publish photos, videos, reels, stories, carousels, and manage posts',
          },
          {
            name: 'Comment',
            value: 'comment',
            description: 'Manage comments, replies, hide/unhide, and delete comments on media posts',
          },
          {
            name: 'Direct Message',
            value: 'message',
            description: 'Send text & media direct messages, read conversations and chat history',
          },
          {
            name: 'Insight',
            value: 'insight',
            description: 'Retrieve detailed metrics and statistics for accounts and media items',
          },
          {
            name: 'Mention',
            value: 'mention',
            description: 'Handle mentions in captions/comments and reply to tagged media',
          },
          {
            name: 'Custom API Request',
            value: 'custom',
            description: 'Execute arbitrary Graph API HTTP requests',
          },
        ],
        default: 'user',
      },

      // Operations & Fields definitions
      ...userOperations,
      ...userFields,
      ...mediaOperations,
      ...mediaFields,
      ...commentOperations,
      ...commentFields,
      ...messageOperations,
      ...messageFields,
      ...insightOperations,
      ...insightFields,
      ...mentionOperations,
      ...mentionFields,
      ...customOperations,
      ...customFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0, '') as string;
    const handler = resourceHandlers[resource];

    if (!handler) {
      throw new NodeOperationError(this.getNode(), `Unsupported resource: ${resource}`);
    }

    for (let i = 0; i < items.length; i++) {
      try {
        const responseData = await handler.call(this, operation, i);

        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData as any),
          { itemData: { item: i } },
        );

        returnData.push(...executionData);
      } catch (error: any) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message,
              details: error.description || error.context || undefined,
            },
            pairedItem: {
              item: i,
            },
          });
          continue;
        }

        if (error.context) {
          error.context.itemIndex = i;
          throw error;
        }

        throw new NodeOperationError(this.getNode(), error, {
          itemIndex: i,
        });
      }
    }

    return [returnData];
  }
}

import { INodeProperties } from 'n8n-workflow';

export const mentionOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['mention'],
      },
    },
    options: [
      {
        name: 'Get Mentioned Comment',
        value: 'getMentionedComment',
        description: 'Get details of a comment where the account was @mentioned',
        action: 'Get a mentioned comment',
      },
      {
        name: 'Get Mentioned Media',
        value: 'getMentionedMedia',
        description: 'Get media posts where the authenticated account was tagged or @mentioned',
        action: 'Get mentioned media',
      },
      {
        name: 'Reply to Mention',
        value: 'replyToMention',
        description: 'Post a comment reply to a caption or comment where your account was @mentioned',
        action: 'Reply to a mention',
      },
    ],
    default: 'getMentionedMedia',
  },
];

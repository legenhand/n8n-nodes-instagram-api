import { INodeProperties } from 'n8n-workflow';

export const commentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['comment'],
      },
    },
    options: [
      {
        name: 'Get Comment',
        value: 'get',
        description: 'Get details of a specific comment',
        action: 'Get a comment',
      },
      {
        name: 'Get Many Comments',
        value: 'getAll',
        description: 'Get all top-level comments on a media item',
        action: 'Get many comments',
      },
      {
        name: 'Get Replies',
        value: 'getReplies',
        description: 'Get replies to a specific comment',
        action: 'Get comment replies',
      },
      {
        name: 'Create Comment',
        value: 'create',
        description: 'Post a new comment on a media item',
        action: 'Create a comment',
      },
      {
        name: 'Reply to Comment',
        value: 'reply',
        description: 'Reply to an existing comment',
        action: 'Reply to a comment',
      },
      {
        name: 'Delete Comment',
        value: 'delete',
        description: 'Delete a comment',
        action: 'Delete a comment',
      },
      {
        name: 'Hide / Unhide Comment',
        value: 'hide',
        description: 'Hide or unhide a comment on your post',
        action: 'Hide or unhide a comment',
      },
    ],
    default: 'getAll',
  },
];

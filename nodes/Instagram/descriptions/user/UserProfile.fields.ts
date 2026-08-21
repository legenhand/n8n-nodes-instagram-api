import { INodeProperties } from 'n8n-workflow';

export const userProfileFields: INodeProperties[] = [
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
    default: [
      'id',
      'user_id',
      'username',
      'name',
      'account_type',
      'profile_picture_url',
      'followers_count',
      'media_count',
      'biography',
      'website',
    ],
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['get', 'getMe'],
        fieldsMode: ['selected'],
      },
    },
    description: 'Specific fields to return in the response',
  },
];

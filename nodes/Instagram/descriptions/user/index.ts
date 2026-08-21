import { INodeProperties } from 'n8n-workflow';
import { userOperations } from './User.operations';
import { userProfileFields } from './UserProfile.fields';
import { userInsightsFields } from './UserInsights.fields';

export const userFields: INodeProperties[] = [
  ...userProfileFields,
  ...userInsightsFields,
];

export { userOperations };

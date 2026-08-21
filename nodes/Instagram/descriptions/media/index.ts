import { INodeProperties } from 'n8n-workflow';
import { mediaOperations } from './Media.operations';
import { mediaGetFields } from './MediaGet.fields';
import { mediaPublishFields } from './MediaPublish.fields';

export const mediaFields: INodeProperties[] = [
  ...mediaGetFields,
  ...mediaPublishFields,
];

export { mediaOperations };

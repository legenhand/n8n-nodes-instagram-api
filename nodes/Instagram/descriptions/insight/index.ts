import { INodeProperties } from 'n8n-workflow';
import { insightOperations } from './Insight.operations';
import { accountInsightFields } from './AccountInsight.fields';
import { mediaInsightFields } from './MediaInsight.fields';

export const insightFields: INodeProperties[] = [
  ...accountInsightFields,
  ...mediaInsightFields,
];

export { insightOperations };

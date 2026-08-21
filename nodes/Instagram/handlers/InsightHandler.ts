import { IDataObject, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import {
  getResolvedUserId,
  instagramApiRequest,
  resolveParameterList,
} from '../GenericFunctions';

const ALL_ACCOUNT_METRICS =
  'reach,views,accounts_engaged,total_interactions,likes,comments,shares,saves,replies,profile_views,website_clicks,content_views';

const ALL_MEDIA_METRICS =
  'reach,views,saved,shares,likes,comments,total_interactions,plays,profile_visits,profile_activity,follows';

async function handleGetAccountInsights(this: IExecuteFunctions, i: number): Promise<any> {
  const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
  const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
  const metric = resolveParameterList.call(this, i, ALL_ACCOUNT_METRICS, 'metrics', 'metricsMode');
  const period = this.getNodeParameter('period', i, 'day') as string;
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

  const qs: IDataObject = { metric, period };
  if (additionalFields.since) qs.since = additionalFields.since;
  if (additionalFields.until) qs.until = additionalFields.until;
  if (additionalFields.metric_type && additionalFields.metric_type !== 'default') {
    qs.metric_type = additionalFields.metric_type;
  }

  return await instagramApiRequest.call(
    this,
    'GET',
    `/${resolvedUserId}/insights`,
    {},
    qs,
  );
}

async function handleGetMediaInsights(this: IExecuteFunctions, i: number): Promise<any> {
  const mediaId = this.getNodeParameter('mediaId', i) as string;
  const metric = resolveParameterList.call(this, i, ALL_MEDIA_METRICS, 'mediaMetrics', 'mediaMetricsMode');

  return await instagramApiRequest.call(
    this,
    'GET',
    `/${mediaId}/insights`,
    {},
    { metric },
  );
}

const insightOperationHandlers: Record<
  string,
  (this: IExecuteFunctions, i: number) => Promise<any>
> = {
  getAccountInsights: handleGetAccountInsights,
  getMediaInsights: handleGetMediaInsights,
};

export async function handleInsight(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  const handler = insightOperationHandlers[operation];
  if (!handler) {
    throw new NodeOperationError(this.getNode(), `Unsupported Insight operation: ${operation}`, {
      itemIndex: i,
    });
  }
  return await handler.call(this, i);
}

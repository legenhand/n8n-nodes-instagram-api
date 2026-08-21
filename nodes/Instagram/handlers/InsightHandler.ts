import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import {
  getResolvedUserId,
  instagramApiRequest,
} from '../GenericFunctions';

export async function handleInsight(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  if (operation === 'getAccountInsights') {
    const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
    const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
    const metricsMode = this.getNodeParameter('metricsMode', i, 'all') as string;
    const allStandardMetrics =
      'reach,views,accounts_engaged,total_interactions,likes,comments,shares,saves,replies,profile_views,website_clicks,content_views';
    const selectedMetrics = (this.getNodeParameter('metrics', i, []) as string[]).join(',');
    const metrics = metricsMode === 'all' ? allStandardMetrics : selectedMetrics || allStandardMetrics;
    const period = this.getNodeParameter('period', i, 'day') as string;
    const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

    const qs: IDataObject = {
      metric: metrics,
      period,
    };

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

  if (operation === 'getMediaInsights') {
    const mediaId = this.getNodeParameter('mediaId', i) as string;
    const mediaMetricsMode = this.getNodeParameter('mediaMetricsMode', i, 'all') as string;
    const allMediaMetrics =
      'reach,views,saved,shares,likes,comments,total_interactions,plays,profile_visits,profile_activity,follows';
    const selectedMediaMetrics = (this.getNodeParameter('mediaMetrics', i, []) as string[]).join(',');
    const mediaMetrics =
      mediaMetricsMode === 'all' ? allMediaMetrics : selectedMediaMetrics || allMediaMetrics;

    return await instagramApiRequest.call(
      this,
      'GET',
      `/${mediaId}/insights`,
      {},
      { metric: mediaMetrics },
    );
  }

  return undefined;
}

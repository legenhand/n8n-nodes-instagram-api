import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { getResolvedUserId, instagramApiRequest } from '../GenericFunctions';

export async function handleUser(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  if (operation === 'getMe' || operation === 'get') {
    const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
    const allUserFields =
      'id,user_id,username,name,account_type,profile_picture_url,followers_count,follows_count,media_count,biography,website';
    const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
    const fields = fieldsMode === 'all' ? allUserFields : selectedFields || allUserFields;

    if (operation === 'getMe') {
      return await instagramApiRequest.call(this, 'GET', '/me', {}, { fields });
    } else {
      const userId = this.getNodeParameter('userId', i) as string;
      return await instagramApiRequest.call(this, 'GET', `/${userId}`, {}, { fields });
    }
  }

  if (operation === 'getInsights') {
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

  return undefined;
}

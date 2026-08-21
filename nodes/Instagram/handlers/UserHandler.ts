import { IDataObject, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { getResolvedUserId, instagramApiRequest, resolveParameterList } from '../GenericFunctions';

const ALL_USER_FIELDS =
  'id,user_id,username,name,account_type,profile_picture_url,followers_count,follows_count,media_count,biography,website';

const ALL_USER_INSIGHTS_METRICS =
  'reach,views,accounts_engaged,total_interactions,likes,comments,shares,saves,replies,profile_views,website_clicks,content_views';

async function handleGetUserProfile(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  const fields = resolveParameterList.call(this, i, ALL_USER_FIELDS, 'fields', 'fieldsMode');
  const endpoint = operation === 'getMe' ? '/me' : `/${this.getNodeParameter('userId', i) as string}`;
  return await instagramApiRequest.call(this, 'GET', endpoint, {}, { fields });
}

async function handleGetUserInsights(
  this: IExecuteFunctions,
  _operation: string,
  i: number,
): Promise<any> {
  const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
  const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
  const metric = resolveParameterList.call(this, i, ALL_USER_INSIGHTS_METRICS, 'metrics', 'metricsMode');
  const period = this.getNodeParameter('period', i, 'day') as string;
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

  const qs: IDataObject = { metric, period };
  if (additionalFields.since) qs.since = additionalFields.since;
  if (additionalFields.until) qs.until = additionalFields.until;
  if (additionalFields.metric_type && additionalFields.metric_type !== 'default') {
    qs.metric_type = additionalFields.metric_type;
  }

  return await instagramApiRequest.call(this, 'GET', `/${resolvedUserId}/insights`, {}, qs);
}

const userOperationHandlers: Record<
  string,
  (this: IExecuteFunctions, operation: string, i: number) => Promise<any>
> = {
  getMe: handleGetUserProfile,
  get: handleGetUserProfile,
  getInsights: handleGetUserInsights,
};

export async function handleUser(
  this: IExecuteFunctions,
  operation: string,
  i: number,
): Promise<any> {
  const handler = userOperationHandlers[operation];
  if (!handler) {
    throw new NodeOperationError(this.getNode(), `Unsupported User operation: ${operation}`, {
      itemIndex: i,
    });
  }
  return await handler.call(this, operation, i);
}

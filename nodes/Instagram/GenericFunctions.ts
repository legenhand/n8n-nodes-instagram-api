import {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  IHttpRequestMethods,
  IHttpRequestOptions,
  ILoadOptionsFunctions,
  NodeApiError,
  NodeOperationError,
} from 'n8n-workflow';

export async function instagramApiRequest(
  this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
  options: IDataObject = {},
): Promise<any> {
  const credentials = await this.getCredentials('instagramOAuth2Api').catch(() =>
    this.getCredentials('instagramApi'),
  );

  const baseUrl = (credentials?.baseUrl as string) || 'https://graph.instagram.com';
  const apiVersion = (credentials?.apiVersion as string) || 'v26.0';

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith('http://') || endpoint.startsWith('https://')
    ? endpoint
    : `${baseUrl.replace(/\/$/, '')}/${apiVersion.replace(/^\/|\/$/g, '')}${cleanEndpoint}`;

  const requestOptions: IHttpRequestOptions = {
    method,
    url,
    qs,
    body,
    json: true,
    ...options,
  };

  // If body is empty for GET or DELETE, remove it to avoid unexpected payloads
  if (['GET', 'HEAD', 'DELETE'].includes(method) && Object.keys(body).length === 0) {
    delete requestOptions.body;
  }

  try {
    let credentialType = 'instagramOAuth2Api';
    try {
      await this.getCredentials('instagramOAuth2Api');
    } catch {
      credentialType = 'instagramApi';
    }

    return await this.helpers.httpRequestWithAuthentication.call(
      this,
      credentialType,
      requestOptions,
    );
  } catch (error: any) {
    if (error.response?.body?.error) {
      const metaError = error.response.body.error;
      const message = metaError.message || error.message;
      const errorSubcode = metaError.error_subcode ? ` (Subcode: ${metaError.error_subcode})` : '';
      const errorUserMsg = metaError.error_user_msg ? ` Details: ${metaError.error_user_msg}` : '';
      const formattedMessage = `[Meta Instagram API] ${message}${errorSubcode}${errorUserMsg}`;

      throw new NodeApiError(this.getNode(), error, {
        message: formattedMessage,
        description: `Code: ${metaError.code || metaError.type || 'Unknown'}, fbtrace_id: ${metaError.fbtrace_id || 'N/A'}`,
      });
    }

    throw new NodeApiError(this.getNode(), error);
  }
}

export async function instagramApiRequestAllItems(
  this: IExecuteFunctions | ILoadOptionsFunctions,
  propertyName: string,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
  limit?: number,
): Promise<any[]> {
  const returnData: any[] = [];
  let responseData: any;
  const query = { ...qs };

  let nextUrl: string | undefined = undefined;

  do {
    if (nextUrl) {
      responseData = await instagramApiRequest.call(this, 'GET', nextUrl, {}, {});
    } else {
      responseData = await instagramApiRequest.call(this, method, endpoint, body, query);
    }

    const items = propertyName ? responseData[propertyName] : responseData.data;

    if (Array.isArray(items)) {
      returnData.push(...items);
    } else if (items) {
      returnData.push(items);
    }

    if (limit && returnData.length >= limit) {
      return returnData.slice(0, limit);
    }

    nextUrl = responseData.paging?.next;
  } while (nextUrl);

  return returnData;
}

export async function pollMediaContainerStatus(
  this: IExecuteFunctions,
  containerId: string,
  maxAttempts: number = 30,
  delayMs: number = 4000,
): Promise<void> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const statusResponse = await instagramApiRequest.call(
      this,
      'GET',
      `/${containerId}`,
      {},
      { fields: 'id,status_code,status' },
    );

    const statusCode = statusResponse.status_code;

    if (statusCode === 'FINISHED') {
      return;
    }

    if (statusCode === 'ERROR' || statusCode === 'EXPIRED') {
      const errorMessage = statusResponse.status || `Container upload failed with status ${statusCode}`;
      throw new NodeOperationError(
        this.getNode(),
        `Instagram Media Container Processing Error: ${errorMessage}`,
      );
    }

    // Still IN_PROGRESS or PUBLISHED
    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw new NodeOperationError(
    this.getNode(),
    `Instagram media container ${containerId} did not finish processing within ${(maxAttempts * delayMs) / 1000} seconds. Try publishing again or check media URL.`,
  );
}

export async function getResolvedUserId(
  this: IExecuteFunctions,
  specifiedUserId?: string,
): Promise<string> {
  if (specifiedUserId && specifiedUserId.trim() !== '' && specifiedUserId.trim().toLowerCase() !== 'me') {
    return specifiedUserId.trim();
  }

  // Fetch current user id via /me
  const meResponse = await instagramApiRequest.call(this, 'GET', '/me', {}, { fields: 'id,user_id,username' });
  return meResponse.id || meResponse.user_id || 'me';
}

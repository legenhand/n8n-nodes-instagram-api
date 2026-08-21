import {
  IDataObject,
  IExecuteFunctions,
  IHttpRequestMethods,
  NodeOperationError,
} from 'n8n-workflow';
import { instagramApiRequest } from '../GenericFunctions';

export async function handleCustom(
  this: IExecuteFunctions,
  _operation: string,
  i: number,
): Promise<any> {
  const httpMethod = this.getNodeParameter('httpMethod', i) as IHttpRequestMethods;
  const endpointPath = this.getNodeParameter('endpointPath', i) as string;
  const queryParamsJson = this.getNodeParameter('queryParamsJson', i, '{}') as string | IDataObject;
  const bodyParamsJson = this.getNodeParameter('bodyParamsJson', i, '{}') as string | IDataObject;

  let qs: IDataObject = {};
  let body: IDataObject = {};

  try {
    qs = typeof queryParamsJson === 'string' ? JSON.parse(queryParamsJson) : queryParamsJson;
  } catch {
    throw new NodeOperationError(this.getNode(), 'Query Parameters must be a valid JSON object');
  }

  try {
    body = typeof bodyParamsJson === 'string' ? JSON.parse(bodyParamsJson) : bodyParamsJson;
  } catch {
    throw new NodeOperationError(this.getNode(), 'Body Parameters must be a valid JSON object');
  }

  return await instagramApiRequest.call(
    this,
    httpMethod,
    endpointPath,
    body,
    qs,
  );
}

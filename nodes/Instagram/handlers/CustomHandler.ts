import {
  IDataObject,
  IExecuteFunctions,
  IHttpRequestMethods,
  NodeOperationError,
} from 'n8n-workflow';
import { instagramApiRequest } from '../GenericFunctions';

function parseJsonParameter(
  input: string | IDataObject,
  errorMessage: string,
  nodeContext: any,
  itemIndex: number,
): IDataObject {
  if (typeof input === 'object' && input !== null) {
    return input;
  }
  try {
    return JSON.parse(input || '{}');
  } catch {
    throw new NodeOperationError(nodeContext, errorMessage, { itemIndex });
  }
}

export async function handleCustom(
  this: IExecuteFunctions,
  _operation: string,
  i: number,
): Promise<any> {
  const httpMethod = this.getNodeParameter('httpMethod', i) as IHttpRequestMethods;
  const endpointPath = this.getNodeParameter('endpointPath', i) as string;
  const queryParamsJson = this.getNodeParameter('queryParamsJson', i, '{}') as string | IDataObject;
  const bodyParamsJson = this.getNodeParameter('bodyParamsJson', i, '{}') as string | IDataObject;

  const qs = parseJsonParameter(
    queryParamsJson,
    'Query Parameters must be a valid JSON object',
    this.getNode(),
    i,
  );
  const body = parseJsonParameter(
    bodyParamsJson,
    'Body Parameters must be a valid JSON object',
    this.getNode(),
    i,
  );

  return await instagramApiRequest.call(
    this,
    httpMethod,
    endpointPath,
    body,
    qs,
  );
}

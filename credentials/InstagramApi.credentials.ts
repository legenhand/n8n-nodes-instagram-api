import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class InstagramApi implements ICredentialType {
  name = 'instagramApi';
  displayName = 'Instagram Access Token API';
  documentationUrl = 'https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login';
  icon = 'file:instagram.svg' as const;

  properties: INodeProperties[] = [
    {
      displayName: 'Access Token',
      name: 'accessToken',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description: 'Instagram User Access Token (Short-lived or Long-lived token) obtained via Instagram Login or Meta Developer Portal',
    },
    {
      displayName: 'API Version',
      name: 'apiVersion',
      type: 'string',
      default: 'v26.0',
      description: 'Meta Graph API version to use (e.g. v26.0)',
    },
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://graph.instagram.com',
      description: 'Instagram Graph API Base URL for Instagram Login',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.accessToken}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl || "https://graph.instagram.com"}}/{{$credentials.apiVersion || "v26.0"}}',
      url: '/me',
      qs: {
        fields: 'id,username',
      },
    },
  };
}

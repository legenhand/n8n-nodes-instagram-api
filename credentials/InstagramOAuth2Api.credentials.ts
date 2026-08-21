import {
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class InstagramOAuth2Api implements ICredentialType {
  name = 'instagramOAuth2Api';
  extends = ['oAuth2Api'];
  displayName = 'Instagram OAuth2 API (Business Login)';
  documentationUrl = 'https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login';
  icon = 'file:instagram.svg' as const;

  properties: INodeProperties[] = [
    {
      displayName: 'Grant Type',
      name: 'grantType',
      type: 'hidden',
      default: 'authorizationCode',
    },
    {
      displayName: 'Authorization URL',
      name: 'authUrl',
      type: 'hidden',
      default: 'https://www.instagram.com/oauth/authorize',
    },
    {
      displayName: 'Access Token URL',
      name: 'accessTokenUrl',
      type: 'hidden',
      default: 'https://api.instagram.com/oauth/access_token',
    },
    {
      displayName: 'Scope',
      name: 'scope',
      type: 'hidden',
      default: 'instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_manage_insights',
    },
    {
      displayName: 'Auth URI Query Parameters',
      name: 'authQueryParameters',
      type: 'hidden',
      default: 'response_type=code',
    },
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'hidden',
      default: 'body',
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

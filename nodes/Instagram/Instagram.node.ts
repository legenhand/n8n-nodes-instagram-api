import {
  IExecuteFunctions,
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  IHttpRequestMethods,
} from 'n8n-workflow';

import {
  instagramApiRequest,
  instagramApiRequestAllItems,
  pollMediaContainerStatus,
  getResolvedUserId,
} from './GenericFunctions';

import { userFields, userOperations } from './descriptions/UserDescription';
import { mediaFields, mediaOperations } from './descriptions/MediaDescription';
import { commentFields, commentOperations } from './descriptions/CommentDescription';
import { insightFields, insightOperations } from './descriptions/InsightDescription';
import { messageFields, messageOperations } from './descriptions/MessageDescription';
import { mentionFields, mentionOperations } from './descriptions/MentionDescription';
import { customFields, customOperations } from './descriptions/CustomDescription';

export class Instagram implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Instagram (Instagram Login)',
    name: 'instagram',
    icon: 'file:instagram.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Instagram API using Instagram Login (Publishing, Comments, DMs, Insights, Profile)',
    defaults: {
      name: 'Instagram',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'instagramOAuth2Api',
        required: true,
        displayOptions: {
          show: {
            authentication: ['oAuth2'],
          },
        },
      },
      {
        name: 'instagramApi',
        required: true,
        displayOptions: {
          show: {
            authentication: ['accessToken'],
          },
        },
      },
    ],
    properties: [
      {
        displayName: 'Authentication',
        name: 'authentication',
        type: 'options',
        options: [
          {
            name: 'OAuth2 (Instagram Business Login)',
            value: 'oAuth2',
          },
          {
            name: 'Access Token',
            value: 'accessToken',
          },
        ],
        default: 'oAuth2',
      },
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'User / Profile',
            value: 'user',
          },
          {
            name: 'Media (Post, Video, Carousel, Story)',
            value: 'media',
          },
          {
            name: 'Comment',
            value: 'comment',
          },
          {
            name: 'Direct Message',
            value: 'message',
          },
          {
            name: 'Insight / Analytics',
            value: 'insight',
          },
          {
            name: 'Mention / Tag',
            value: 'mention',
          },
          {
            name: 'Custom Graph API Call',
            value: 'custom',
          },
        ],
        default: 'user',
      },

      // User
      ...userOperations,
      ...userFields,

      // Media
      ...mediaOperations,
      ...mediaFields,

      // Comment
      ...commentOperations,
      ...commentFields,

      // Message
      ...messageOperations,
      ...messageFields,

      // Insight
      ...insightOperations,
      ...insightFields,

      // Mention
      ...mentionOperations,
      ...mentionFields,

      // Custom
      ...customOperations,
      ...customFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData: any;

        // =====================================================================
        //                               USER
        // =====================================================================
        if (resource === 'user') {
          if (operation === 'getMe' || operation === 'get') {
            const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
            const allUserFields = 'id,user_id,username,name,account_type,profile_picture_url,followers_count,follows_count,media_count,biography,website';
            const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
            const fields = fieldsMode === 'all' ? allUserFields : (selectedFields || allUserFields);

            if (operation === 'getMe') {
              responseData = await instagramApiRequest.call(this, 'GET', '/me', {}, { fields });
            } else {
              const userId = this.getNodeParameter('userId', i) as string;
              responseData = await instagramApiRequest.call(this, 'GET', `/${userId}`, {}, { fields });
            }
          } else if (operation === 'getInsights') {
            const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
            const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
            const metricsMode = this.getNodeParameter('metricsMode', i, 'all') as string;
            const allStandardMetrics = 'reach,views,accounts_engaged,total_interactions,likes,comments,shares,saves,replies,profile_views,website_clicks,content_views';
            const selectedMetrics = (this.getNodeParameter('metrics', i, []) as string[]).join(',');
            const metrics = metricsMode === 'all' ? allStandardMetrics : (selectedMetrics || allStandardMetrics);
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

            responseData = await instagramApiRequest.call(
              this,
              'GET',
              `/${resolvedUserId}/insights`,
              {},
              qs,
            );
          }
        }

        // =====================================================================
        //                               MEDIA
        // =====================================================================
        else if (resource === 'media') {
          if (operation === 'get') {
            const mediaId = this.getNodeParameter('mediaId', i) as string;
            const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
            const allMediaFields = 'id,caption,media_type,media_url,permalink,shortcode,thumbnail_url,timestamp,username,like_count,comments_count,is_comment_enabled,children{id,media_type,media_url,thumbnail_url},alt_text';
            const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
            const fields = fieldsMode === 'all' ? allMediaFields : (selectedFields || allMediaFields);

            responseData = await instagramApiRequest.call(
              this,
              'GET',
              `/${mediaId}`,
              {},
              { fields },
            );
          } else if (operation === 'getAll') {
            const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
            const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);
            const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

            const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
            const allMediaFields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count,is_comment_enabled';
            const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
            const fields = fieldsMode === 'all' ? allMediaFields : (selectedFields || allMediaFields);

            const qs: IDataObject = { fields };

            if (additionalFields.since) qs.since = additionalFields.since;
            if (additionalFields.until) qs.until = additionalFields.until;

            responseData = await instagramApiRequestAllItems.call(
              this,
              'data',
              'GET',
              `/${resolvedUserId}/media`,
              {},
              qs,
              limit,
            );
          } else if (operation === 'publishPhoto') {
            const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
            const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
            const imageUrl = this.getNodeParameter('imageUrl', i) as string;
            const caption = this.getNodeParameter('caption', i, '') as string;
            const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

            const containerBody: IDataObject = {
              image_url: imageUrl,
            };

            if (caption) containerBody.caption = caption;
            if (additionalOptions.alt_text_wrap) containerBody.alt_text_wrap = additionalOptions.alt_text_wrap;
            if (additionalOptions.location_id) containerBody.location_id = additionalOptions.location_id;
            if (additionalOptions.user_tags) {
              try {
                containerBody.user_tags = typeof additionalOptions.user_tags === 'string'
                  ? JSON.parse(additionalOptions.user_tags as string)
                  : additionalOptions.user_tags;
              } catch {
                throw new NodeOperationError(this.getNode(), 'User Tags must be a valid JSON array string');
              }
            }

            // Step 1: Create Container
            const container = await instagramApiRequest.call(
              this,
              'POST',
              `/${resolvedUserId}/media`,
              containerBody,
            );

            // Step 2: Publish Container
            responseData = await instagramApiRequest.call(
              this,
              'POST',
              `/${resolvedUserId}/media_publish`,
              {
                creation_id: container.id,
              },
            );
          } else if (operation === 'publishVideo') {
            const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
            const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
            const videoUrl = this.getNodeParameter('videoUrl', i) as string;
            const mediaType = this.getNodeParameter('mediaType', i, 'REELS') as string;
            const caption = this.getNodeParameter('caption', i, '') as string;
            const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

            const containerBody: IDataObject = {
              video_url: videoUrl,
              media_type: mediaType,
            };

            if (caption) containerBody.caption = caption;
            if (additionalOptions.share_to_feed !== undefined) containerBody.share_to_feed = additionalOptions.share_to_feed;
            if (additionalOptions.cover_url) containerBody.cover_url = additionalOptions.cover_url;
            if (additionalOptions.thumb_offset !== undefined) containerBody.thumb_offset = additionalOptions.thumb_offset;
            if (additionalOptions.audio_name) containerBody.audio_name = additionalOptions.audio_name;
            if (additionalOptions.location_id) containerBody.location_id = additionalOptions.location_id;

            // Step 1: Create Video Container
            const container = await instagramApiRequest.call(
              this,
              'POST',
              `/${resolvedUserId}/media`,
              containerBody,
            );

            // Step 2: Poll Container Status until FINISHED
            await pollMediaContainerStatus.call(this, container.id as string);

            // Step 3: Publish Container
            responseData = await instagramApiRequest.call(
              this,
              'POST',
              `/${resolvedUserId}/media_publish`,
              {
                creation_id: container.id,
              },
            );
          } else if (operation === 'publishCarousel') {
            const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
            const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
            const caption = this.getNodeParameter('caption', i, '') as string;
            const carouselItems = this.getNodeParameter('carouselItems.items', i, []) as Array<{
              mediaType: string;
              url: string;
              altText?: string;
            }>;
            const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;

            if (!carouselItems || carouselItems.length < 2 || carouselItems.length > 10) {
              throw new NodeOperationError(
                this.getNode(),
                'Instagram Carousels require between 2 and 10 items.',
              );
            }

            // Step 1: Create Item Containers
            const childrenIds: string[] = [];

            for (const item of carouselItems) {
              const itemBody: IDataObject = {
                is_carousel_item: true,
              };

              if (item.mediaType === 'IMAGE') {
                itemBody.image_url = item.url;
                if (item.altText) itemBody.alt_text_wrap = item.altText;
              } else {
                itemBody.media_type = 'VIDEO';
                itemBody.video_url = item.url;
              }

              const itemContainer = await instagramApiRequest.call(
                this,
                'POST',
                `/${resolvedUserId}/media`,
                itemBody,
              );

              if (item.mediaType === 'VIDEO') {
                await pollMediaContainerStatus.call(this, itemContainer.id as string);
              }

              childrenIds.push(itemContainer.id as string);
            }

            // Step 2: Create Carousel Parent Container
            const carouselBody: IDataObject = {
              media_type: 'CAROUSEL',
              children: childrenIds.join(','),
            };

            if (caption) carouselBody.caption = caption;
            if (additionalOptions.location_id) carouselBody.location_id = additionalOptions.location_id;

            const carouselContainer = await instagramApiRequest.call(
              this,
              'POST',
              `/${resolvedUserId}/media`,
              carouselBody,
            );

            // Step 3: Publish Carousel
            responseData = await instagramApiRequest.call(
              this,
              'POST',
              `/${resolvedUserId}/media_publish`,
              {
                creation_id: carouselContainer.id,
              },
            );
          } else if (operation === 'publishStory') {
            const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
            const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
            const storyMediaType = this.getNodeParameter('storyMediaType', i, 'IMAGE') as string;
            const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;

            const storyBody: IDataObject = {
              media_type: 'STORIES',
            };

            if (storyMediaType === 'IMAGE') {
              storyBody.image_url = mediaUrl;
            } else {
              storyBody.video_url = mediaUrl;
            }

            const container = await instagramApiRequest.call(
              this,
              'POST',
              `/${resolvedUserId}/media`,
              storyBody,
            );

            if (storyMediaType === 'VIDEO') {
              await pollMediaContainerStatus.call(this, container.id as string);
            }

            responseData = await instagramApiRequest.call(
              this,
              'POST',
              `/${resolvedUserId}/media_publish`,
              {
                creation_id: container.id,
              },
            );
          } else if (operation === 'delete') {
            const mediaId = this.getNodeParameter('mediaId', i) as string;
            responseData = await instagramApiRequest.call(
              this,
              'DELETE',
              `/${mediaId}`,
            );
          }
        }

        // =====================================================================
        //                              COMMENT
        // =====================================================================
        else if (resource === 'comment') {
          if (operation === 'get') {
            const commentId = this.getNodeParameter('commentId', i) as string;
            const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
            const allCommentFields = 'id,text,timestamp,like_count,hidden,replies_count,username,from{id,username}';
            const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
            const fields = fieldsMode === 'all' ? allCommentFields : (selectedFields || allCommentFields);

            responseData = await instagramApiRequest.call(
              this,
              'GET',
              `/${commentId}`,
              {},
              { fields },
            );
          } else if (operation === 'getAll') {
            const mediaId = this.getNodeParameter('mediaId', i) as string;
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);
            const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
            const allCommentFields = 'id,text,timestamp,like_count,hidden,replies_count,username,from{id,username}';
            const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
            const fields = fieldsMode === 'all' ? allCommentFields : (selectedFields || allCommentFields);

            responseData = await instagramApiRequestAllItems.call(
              this,
              'data',
              'GET',
              `/${mediaId}/comments`,
              {},
              { fields },
              limit,
            );
          } else if (operation === 'getReplies') {
            const commentId = this.getNodeParameter('commentId', i) as string;
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);
            const fieldsMode = this.getNodeParameter('fieldsMode', i, 'all') as string;
            const allCommentFields = 'id,text,timestamp,like_count,hidden,replies_count,username,from{id,username}';
            const selectedFields = (this.getNodeParameter('fields', i, []) as string[]).join(',');
            const fields = fieldsMode === 'all' ? allCommentFields : (selectedFields || allCommentFields);

            responseData = await instagramApiRequestAllItems.call(
              this,
              'data',
              'GET',
              `/${commentId}/replies`,
              {},
              { fields },
              limit,
            );
          } else if (operation === 'create') {
            const mediaId = this.getNodeParameter('mediaId', i) as string;
            const message = this.getNodeParameter('message', i) as string;

            responseData = await instagramApiRequest.call(
              this,
              'POST',
              `/${mediaId}/comments`,
              { message },
            );
          } else if (operation === 'reply') {
            const commentId = this.getNodeParameter('commentId', i) as string;
            const message = this.getNodeParameter('message', i) as string;

            responseData = await instagramApiRequest.call(
              this,
              'POST',
              `/${commentId}/replies`,
              { message },
            );
          } else if (operation === 'delete') {
            const commentId = this.getNodeParameter('commentId', i) as string;
            responseData = await instagramApiRequest.call(
              this,
              'DELETE',
              `/${commentId}`,
            );
          } else if (operation === 'hide') {
            const commentId = this.getNodeParameter('commentId', i) as string;
            const hide = this.getNodeParameter('hide', i, true) as boolean;

            responseData = await instagramApiRequest.call(
              this,
              'POST',
              `/${commentId}`,
              { hide },
            );
          }
        }

        // =====================================================================
        //                              MESSAGE
        // =====================================================================
        else if (resource === 'message') {
          if (operation === 'sendText') {
            const recipientId = this.getNodeParameter('recipientId', i) as string;
            const text = this.getNodeParameter('text', i) as string;

            responseData = await instagramApiRequest.call(
              this,
              'POST',
              '/me/messages',
              {
                recipient: { id: recipientId },
                message: { text },
              },
            );
          } else if (operation === 'sendMedia') {
            const recipientId = this.getNodeParameter('recipientId', i) as string;
            const attachmentType = this.getNodeParameter('attachmentType', i) as string;
            const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;

            responseData = await instagramApiRequest.call(
              this,
              'POST',
              '/me/messages',
              {
                recipient: { id: recipientId },
                message: {
                  attachment: {
                    type: attachmentType,
                    payload: {
                      url: mediaUrl,
                      is_reusable: true,
                    },
                  },
                },
              },
            );
          } else if (operation === 'getConversations') {
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);

            responseData = await instagramApiRequestAllItems.call(
              this,
              'data',
              'GET',
              '/me/conversations',
              {},
              { fields: 'id,updated_time,participants,unread_count' },
              limit,
            );
          } else if (operation === 'getMessages') {
            const conversationId = this.getNodeParameter('conversationId', i) as string;
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);

            responseData = await instagramApiRequestAllItems.call(
              this,
              'data',
              'GET',
              `/${conversationId}/messages`,
              {},
              { fields: 'id,created_time,from,to,message,attachments' },
              limit,
            );
          }
        }

        // =====================================================================
        //                              INSIGHT
        // =====================================================================
        else if (resource === 'insight') {
          if (operation === 'getAccountInsights') {
            const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
            const resolvedUserId = await getResolvedUserId.call(this, rawUserId);
            const metricsMode = this.getNodeParameter('metricsMode', i, 'all') as string;
            const allStandardMetrics = 'reach,views,accounts_engaged,total_interactions,likes,comments,shares,saves,replies,profile_views,website_clicks,content_views';
            const selectedMetrics = (this.getNodeParameter('metrics', i, []) as string[]).join(',');
            const metrics = metricsMode === 'all' ? allStandardMetrics : (selectedMetrics || allStandardMetrics);
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

            responseData = await instagramApiRequest.call(
              this,
              'GET',
              `/${resolvedUserId}/insights`,
              {},
              qs,
            );
          } else if (operation === 'getMediaInsights') {
            const mediaId = this.getNodeParameter('mediaId', i) as string;
            const mediaMetricsMode = this.getNodeParameter('mediaMetricsMode', i, 'all') as string;
            const allMediaMetrics = 'reach,views,saved,shares,likes,comments,total_interactions,plays,profile_visits,profile_activity,follows';
            const selectedMediaMetrics = (this.getNodeParameter('mediaMetrics', i, []) as string[]).join(',');
            const mediaMetrics = mediaMetricsMode === 'all' ? allMediaMetrics : (selectedMediaMetrics || allMediaMetrics);

            responseData = await instagramApiRequest.call(
              this,
              'GET',
              `/${mediaId}/insights`,
              {},
              { metric: mediaMetrics },
            );
          }
        }

        // =====================================================================
        //                              MENTION
        // =====================================================================
        else if (resource === 'mention') {
          const rawUserId = this.getNodeParameter('userId', i, 'me') as string;
          const resolvedUserId = await getResolvedUserId.call(this, rawUserId);

          if (operation === 'getMentionedMedia') {
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 50) as number);

            responseData = await instagramApiRequestAllItems.call(
              this,
              'data',
              'GET',
              `/${resolvedUserId}/tags`,
              {},
              { fields: 'id,caption,media_type,media_url,permalink,timestamp,username' },
              limit,
            );
          } else if (operation === 'getMentionedComment') {
            const commentId = this.getNodeParameter('commentId', i) as string;

            responseData = await instagramApiRequest.call(
              this,
              'GET',
              `/${resolvedUserId}/mentioned_comment`,
              {},
              {
                comment_id: commentId,
                fields: 'id,text,timestamp,media{id,permalink}',
              },
            );
          } else if (operation === 'replyToMention') {
            const mentionTargetType = this.getNodeParameter('mentionTargetType', i) as string;
            const targetId = this.getNodeParameter('targetId', i) as string;
            const message = this.getNodeParameter('message', i) as string;

            const body: IDataObject = { message };
            if (mentionTargetType === 'media') {
              body.media_id = targetId;
            } else {
              body.comment_id = targetId;
            }

            responseData = await instagramApiRequest.call(
              this,
              'POST',
              `/${resolvedUserId}/mentions`,
              body,
            );
          }
        }

        // =====================================================================
        //                              CUSTOM
        // =====================================================================
        else if (resource === 'custom') {
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

          responseData = await instagramApiRequest.call(
            this,
            httpMethod,
            endpointPath,
            body,
            qs,
          );
        }

        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData as IDataObject[]),
          { itemData: { item: i } },
        );

        returnData.push(...executionData);
      } catch (error: any) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message,
            },
            pairedItem: {
              item: i,
            },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

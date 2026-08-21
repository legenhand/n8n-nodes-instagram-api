---
title: Direct Messaging (DM) Operations
description: Send direct messages, media attachments, and read conversation threads.
sidebar:
  order: 4
---

# Direct Messaging (DM) Operations

The **Message** resource integrates with the **Instagram Messaging API** to enable conversational automations and chatbots.

:::note[Instagram-Scoped User ID (IGSID)]
Direct messaging in the Instagram Graph API requires the recipient's **Instagram-Scoped User ID (IGSID)**, which is generated when a user interacts with your business via DMs, Story replies, or mentions.
:::

---

## 1. Send Text Message (`sendText`)

Sends a text message to a user via their IGSID.

### Parameters

- **Recipient ID (IGSID)**: The Instagram-Scoped ID of the user.
- **Message**: Text content of the direct message.

---

## 2. Send Media Message (`sendMedia`)

Sends rich media attachments (images, video clips, audio voice notes, or files) directly in the chat.

### Parameters

- **Recipient ID (IGSID)**: The recipient's IGSID.
- **Media Type**: `IMAGE`, `VIDEO`, `AUDIO`, or `FILE`.
- **Media URL**: Publicly accessible direct URL to the media asset.

---

## 3. Get Conversations (`getConversations`)

Lists active direct message conversation threads for your Instagram Professional account.

### Parameters

- **User ID**: `me` or specific Instagram User ID.
- **Limit**: Maximum number of conversation threads to return.

---

## 4. Get Messages in Conversation (`getMessages`)

Retrieves message history and individual messages within a specific conversation thread.

### Parameters

- **Conversation ID**: The conversation thread ID.
- **Fields**: `id`, `message`, `from`, `to`, `created_time`, `attachments`.

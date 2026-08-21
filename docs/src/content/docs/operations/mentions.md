---
title: Mentions & Tags Operations
description: Track media where your account is tagged or @mentioned and reply directly.
sidebar:
  order: 6
---

# Mentions & Tags Operations

The **Mention** resource lets you track when other Instagram users mention (`@your_username`) or tag your brand in photos, video captions, or comments.

---

## 1. Get Mentioned Media (`getMentionedMedia`)

Retrieves a list of posts where your account was tagged in photos or mentioned in captions.

### Parameters

- **User ID**: `me` or specific Instagram User ID.
- **Fields**: `id`, `caption`, `media_type`, `media_url`, `permalink`, `timestamp`, `like_count`, `comments_count`.

---

## 2. Get Mentioned Comment (`getMentionedComment`)

Retrieves the content of a specific comment where your username was `@mentioned`.

### Parameters

- **Comment ID**: The comment ID containing the mention.
- **Fields**: `id`, `text`, `timestamp`, `like_count`, `username`.

---

## 3. Reply to Mention (`replyToMention`)

Posts a comment reply directly to a post or comment where your brand was mentioned.

### Parameters

- **Target**: `Media Caption` or `Comment`.
- **Media ID / Comment ID**: Target ID.
- **Message**: Your reply message text.

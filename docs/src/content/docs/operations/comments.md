---
title: Comment Moderation Operations
description: Retrieve, post, reply, moderate, hide, and delete Instagram comments.
sidebar:
  order: 3
---

# Comment Moderation Operations

The **Comment** resource provides complete management over comments across all your Instagram posts.

---

## 1. Get Many Comments (`getAll`)

Retrieves a list of top-level comments on a specific media item.

### Parameters

- **Media ID**: ID of the Instagram media post.
- **Fields**: `id`, `text`, `timestamp`, `like_count`, `hidden`, `username`, `replies`.
- **Return All / Limit**: Retrieve up to a specific limit or page through all comments.

---

## 2. Get Comment (`get`)

Retrieves details for a single specific comment.

### Parameters

- **Comment ID**: The unique Instagram Comment ID.
- **Fields**: `id`, `text`, `timestamp`, `like_count`, `hidden`, `from`, `user`.

---

## 3. Get Replies (`getReplies`)

Fetches nested replies to a specific top-level comment.

### Parameters

- **Comment ID**: The parent Comment ID.
- **Fields**: `id`, `text`, `timestamp`, `like_count`, `username`.

---

## 4. Create Comment (`create`)

Publishes a new top-level comment on an Instagram media post.

### Parameters

- **Media ID**: ID of the media post.
- **Message**: Comment content.

---

## 5. Reply to Comment (`reply`)

Posts a nested reply directly to a specific comment.

### Parameters

- **Comment ID**: ID of the comment to reply to.
- **Message**: Reply message text.

---

## 6. Hide / Unhide Comment (`hide`)

Hides or unhides a comment on your posts so it is not visible to other users.

### Parameters

- **Comment ID**: The comment to moderate.
- **Hide**: Toggle `true` to hide the comment, `false` to unhide.

---

## 7. Delete Comment (`delete`)

Permanently deletes a comment from your media post.

### Parameters

- **Comment ID**: The comment ID to delete.

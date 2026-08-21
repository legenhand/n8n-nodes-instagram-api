---
title: Media & Publishing Operations
description: Publish single photos, videos, reels, carousels, and stories to Instagram.
sidebar:
  order: 2
---

# Media & Publishing Operations

The **Media** resource enables you to publish various media formats directly to Instagram and manage existing media posts.

---

## 1. Publish Single Photo (`publishPhoto`)

Publishes an image post to the Instagram feed.

### Parameters

- **Image URL**: Publicly accessible URL of the JPEG image.
- **Caption**: Text caption including mentions (`@username`) and hashtags (`#hashtag`).
- **Additional Options**:
  - **Alt Text**: Custom accessibility text.
  - **Location ID**: Facebook Page ID representing a physical location.
  - **User Tags**: JSON array of user tags (e.g. `[{"username":"johndoe","x":0.5,"y":0.5}]`).

---

## 2. Publish Video & Instagram Reels (`publishVideo`)

Uploads video files as either standard video posts or Instagram Reels.

:::tip[Automatic Status Polling]
Meta processes videos asynchronously. This node automatically polls the container status (`IN_PROGRESS` → `FINISHED`) with exponential backoff before triggering the final publish call, ensuring your n8n workflow proceeds only when the video is live.
:::

### Parameters

- **Video URL**: Publicly accessible video URL (e.g., MP4 or MOV).
- **Media Type**:
  - `REELS`: Published as an Instagram Reel (9:16 aspect ratio recommended).
  - `VIDEO`: Standard in-feed video post.
- **Caption**: Post caption and hashtags.
- **Additional Video Options**:
  - **Share To Feed (Reels)**: When enabled, the Reel appears on your main profile grid as well as the Reels tab.
  - **Cover URL**: Custom image URL to use as the thumbnail/cover.
  - **Thumb Offset (ms)**: Timestamp in milliseconds to extract a frame as the cover image.
  - **Audio Name**: Custom audio title for original audio tracks.
  - **Location ID**: Location tag ID.

---

## 3. Publish Carousel (`publishCarousel`)

Creates a multi-item carousel post containing **2 to 10 photos and/or videos** in a single swipeable post.

### Parameters

- **Carousel Items**: Add 2–10 items:
  - **Media Type**: `Photo` or `Video`.
  - **Media URL**: Publicly accessible image or video URL.
  - **Alt Text**: Alt text (for images).
- **Caption**: Caption for the entire carousel post.
- **Additional Options**: `Location ID`.

---

## 4. Publish Story (`publishStory`)

Publishes temporary 24-hour photo or video content to Instagram Stories.

### Parameters

- **Media Type**: `Photo` or `Video`.
- **Media URL**: Publicly accessible URL (9:16 aspect ratio recommended, 1080x1920).

---

## 5. Get Media Details (`get`)

Retrieves metadata and engagement statistics for a specific media post.

### Parameters

- **Media ID**: The Instagram Media ID.
- **Fields**: `id`, `caption`, `media_type`, `media_url`, `permalink`, `thumbnail_url`, `timestamp`, `like_count`, `comments_count`.

---

## 6. Delete Media (`delete`)

Permanently deletes a post published by the authenticated account.

### Parameters

- **Media ID**: The Instagram Media ID to delete.

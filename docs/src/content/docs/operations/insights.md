---
title: Insights & Analytics Operations
description: Retrieve account-level and media-level metrics and statistics.
sidebar:
  order: 5
---

# Insights & Analytics Operations

The **Insight** resource provides access to performance data, demographic insights, reach, and engagement metrics for accounts and individual media posts.

---

## 1. Get Account Insights (`getAccountInsights`)

Retrieves aggregated account-level performance metrics across a given time window.

### Available Metrics

- `reach`: Unique accounts that viewed your content.
- `views`: Total impressions/views across all posts and stories.
- `profile_views`: Number of visitors to your profile page.
- `accounts_engaged`: Accounts that engaged with your posts (liked, shared, commented, or saved).
- `total_interactions`: Sum of all engagement actions.
- `follower_count`: Daily follower net growth.
- `website_clicks`: Clicks on the external website link in your bio.

### Parameters

- **User ID**: `me` or specific Instagram User ID.
- **Metrics Selection**: `All Metrics (Select All)` or choose specific metrics.
- **Time Range Preset**:
  - `Last 7 Days`
  - `Last 14 Days`
  - `Last 30 Days`
  - `This Month`
  - `Custom Date Range` (provide custom `since` and `until` UNIX timestamps).

---

## 2. Get Media Insights (`getMediaInsights`)

Retrieves metrics for a specific post, Reel, or Story.

### Available Media Metrics

- `reach`: Number of unique accounts that saw the media.
- `views`: Video/Reel views or impressions.
- `engagement`: Total likes, comments, and saves.
- `saved`: Number of times the post was saved to bookmarks.
- `shares`: Number of times the post was shared to DMs or Stories.
- `likes`: Total likes.
- `comments`: Total comments.
- `plays`: Reels video play count.
- `profile_visits`: Profile visits directly triggered by this media post.

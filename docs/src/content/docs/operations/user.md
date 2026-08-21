---
title: User & Profile Operations
description: Retrieve authenticated account profile or inspect other Instagram accounts.
sidebar:
  order: 1
---

# User & Profile Operations

The **User** resource allows you to retrieve information about the currently authenticated Instagram account or any Instagram Business/Creator account.

---

## Available Operations

### 1. Get Me (`getMe`)

Retrieves the profile information of the currently authenticated account via the `/me` endpoint.

#### Parameters

- **Fields to Retrieve**:
  - `All Fields (Recommended)`: Returns `id`, `user_id`, `username`, `name`, `account_type`, `profile_picture_url`, `followers_count`, `media_count`, `biography`, `website`.
  - `Selected Fields`: Select a subset of the fields above.

#### Example Output

```json
{
  "id": "17841400000000000",
  "user_id": "17841400000000000",
  "username": "my_business_account",
  "name": "My Business",
  "account_type": "BUSINESS",
  "profile_picture_url": "https://scontent.cdninstagram.com/...",
  "followers_count": 12500,
  "follows_count": 340,
  "media_count": 182,
  "biography": "Official Instagram profile for My Business",
  "website": "https://example.com"
}
```

---

### 2. Get User Profile (`get`)

Retrieves the public profile information of another Instagram Professional account by its Instagram User ID.

#### Parameters

- **User ID**: The unique Instagram Scoped User ID of the target account.
- **Fields to Retrieve**: Choose `All Fields` or select specific fields (`username`, `name`, `biography`, `followers_count`, etc.).

---

### 3. Get User Insights (`getInsights`)

Retrieves account-level insights and performance metrics directly from the user endpoint.

#### Parameters

- **User ID**: Instagram User ID or `me`.
- **Metrics**: Select one or more metrics:
  - `reach`: Total number of unique accounts that have seen your content.
  - `views`: Total number of times your content was on screen.
  - `profile_views`: Number of times your profile was viewed.
  - `accounts_engaged`: Number of accounts that interacted with your content.
  - `total_interactions`: Sum of likes, comments, shares, and saves.
  - `follower_count`: Daily follower count history.
  - `website_clicks`: Taps on the link in your bio.
- **Period**: `day` (24-hour intervals).
- **Time Range Preset**: `Last 7 Days`, `Last 14 Days`, `Last 30 Days`, `This Month`, or `Custom Date Range`.

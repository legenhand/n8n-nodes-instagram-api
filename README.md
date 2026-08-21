# n8n-nodes-instagram-api

[![npm version](https://badge.fury.io/js/n8n-nodes-instagram-api.svg)](https://badge.fury.io/js/n8n-nodes-instagram-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An official community node for **n8n** that integrates with **Instagram API with Instagram Login** (Business Login for Instagram) powered by Meta Graph API `v26.0`.

This node enables automated interactions with Instagram Professional accounts (Business & Creator) directly via Instagram Login, **without requiring the account to be connected to a Facebook Page**.

---

## 🌟 Key Features

- **🔐 Dual Authentication Methods**:
  - **OAuth2 (Instagram Business Login)**: Standard Meta OAuth 2.0 authorization flow.
  - **Access Token (Direct / Long-Lived Token)**: Direct token-based authentication (supporting 60-day long-lived tokens).
- **👤 User & Profile**:
  - Retrieve authenticated user profile (`/me`) or look up other accounts (`biography`, `followers_count`, `media_count`, `website`, etc.).
- **📸 Media & Publishing**:
  - **Single Photo**: Publish images to the feed.
  - **Video & Reels**: Publish video posts and Instagram Reels with automatic asynchronous container status polling until ready (`FINISHED`).
  - **Carousel**: Multi-item carousel posts (mixed photos and videos, 2–10 items).
  - **Story**: Publish photos or videos as Instagram Stories.
  - **Get & Delete**: Retrieve detailed media metadata or delete posts.
- **💬 Comment Moderation & Management**:
  - Retrieve comments and replies for any media post.
  - Post top-level comments and reply directly to existing comments.
  - Moderation: Hide or unhide comments.
  - Delete comments.
- **✉️ Direct Messaging (Instagram Messaging API)**:
  - Send text DMs to users using their Instagram-Scoped ID (IGSID).
  - Send media messages with attachments (image, video, audio, file).
  - Retrieve active conversation threads and message histories.
- **📊 Insights & Analytics**:
  - Account-level metrics: *reach*, *impressions*, *profile views*, *accounts engaged*, *total interactions*.
  - Media-level metrics: *reach*, *engagement*, *saved*, *shares*, *video views*, *plays*.
- **🏷️ Mentions & Tags**:
  - Discover media or comments where your account was tagged or @mentioned.
  - Post automated replies to mentions.
- **⚡ Custom Graph API Call**:
  - Execute custom HTTP requests (GET, POST, DELETE) to any Meta Graph API `v26.0` endpoint with automated authentication.

---

## 📋 Prerequisites & Meta App Setup

1. Go to [Meta for Developers](https://developers.facebook.com/) and create a new App (Select **Business** or **Other**).
2. Add the **Instagram Platform** product and select **Instagram API with Instagram Login**.
3. Under **Instagram Platform > Quickstart / Basic Display Settings**, add Instagram Testers or verify your Instagram Professional account.
4. **Required Permissions / Scopes**:
   - `instagram_business_basic`: Read profile info and basic media data.
   - `instagram_business_content_publish`: Upload and publish photos, videos, reels, stories, and carousels.
   - `instagram_business_manage_messages`: Send and receive direct messages.
   - `instagram_business_manage_comments`: Moderate, create, reply to, and delete comments.
   - `instagram_business_manage_insights`: Access account and media analytics.

---

## 🚀 Installation in n8n

### Option 1: Community Nodes UI (Recommended)
1. Open your **n8n instance**.
2. Go to **Settings** > **Community Nodes**.
3. Click **Install a community node**.
4. Enter the package name: `n8n-nodes-instagram-api`
5. Accept the risks and click **Install**.

### Option 2: Manual / Local Development (with Bun)
```bash
# Clone the repository
git clone https://github.com/legenhand/n8n-nodes-instagram-api.git
cd n8n-nodes-instagram-api

# Install dependencies and build
bun install
bun run build

# Link package globally
bun link
# or npm link
```

In your n8n root / custom nodes folder:
```bash
npm link n8n-nodes-instagram-api
```

---

## 🛠️ Credentials Configuration

### 1. Instagram OAuth2 API (Business Login)
- **Client ID**: Your Instagram App ID from the Meta Developer Dashboard.
- **Client Secret**: Your Instagram App Secret.
- **Redirect URL**: Add the n8n OAuth redirect URL shown in the credentials modal to your Meta App OAuth redirect list.
- **API Version**: `v26.0` (default)
- **Base URL**: `https://graph.instagram.com`

### 2. Instagram Access Token API
- **Access Token**: Short-lived or 60-day Long-Lived User Access Token.
- **API Version**: `v26.0` (default)
- **Base URL**: `https://graph.instagram.com`

---

## 📂 Project Structure

```
n8n-nodes-instagram-api/
├── credentials/
│   ├── InstagramApi.credentials.ts        # Access Token Credentials
│   ├── InstagramOAuth2Api.credentials.ts  # OAuth2 Business Login Credentials
│   └── instagram.svg                      # Vector Logo
├── nodes/
│   └── Instagram/
│       ├── Instagram.node.ts              # Main Node Execution Controller
│       ├── Instagram.node.json            # Community Node Metadata
│       ├── GenericFunctions.ts            # API Request Helper, Polling & Pagination
│       ├── instagram.svg                  # Node Icon
│       └── descriptions/                  # Resource UI & Parameter Definitions
│           ├── UserDescription.ts
│           ├── MediaDescription.ts
│           ├── CommentDescription.ts
│           ├── InsightDescription.ts
│           ├── MessageDescription.ts
│           ├── MentionDescription.ts
│           └── CustomDescription.ts
├── scripts/
│   └── copy-assets.ts                     # Asset Bundler (Icons & Metadata)
├── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📄 License

[MIT License](LICENSE) © 2026

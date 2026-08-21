# @rizkifirmansyah/n8n-nodes-instagram-api

[![npm version](https://badge.fury.io/js/@rizkifirmansyah%2Fn8n-nodes-instagram-api.svg)](https://badge.fury.io/js/@rizkifirmansyah%2Fn8n-nodes-instagram-api)
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
  - Retrieve user-level account insights.
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
  - Account-level metrics: *reach*, *views*, *profile views*, *accounts engaged*, *total interactions*, *follower count*, *website clicks*, etc.
  - Media-level metrics: *reach*, *views*, *engagement*, *saved*, *shares*, *likes*, *comments*, *plays*, *profile visits*.
  - Flexible **All Metrics (Select All)** or specific selection mode.
- **🤖 AI Agent Tool Support (LangChain / n8n AI)**:
  - Connect directly to the **AI Agent** node's `Tool` connector using the dedicated **Instagram Tool** sub-node.
  - Allows autonomous AI agents to browse profiles, reply to comments, send DMs, publish content, and retrieve insights on demand.
- **⚡ Custom Graph API Call**:
  - Execute custom HTTP requests (GET, POST, DELETE) to any Meta Graph API `v26.0` endpoint with automated authentication.

---

## 🔑 How to Setup OAuth & Get Instagram Client ID and Secret

Follow these step-by-step instructions to get your **Instagram Client ID** and **Instagram Client Secret** from the Meta App Dashboard:

### 1. Create a Meta Developer App
1. Go to [Meta for Developers Portal](https://developers.facebook.com/apps) and log in (or sign up).
2. Click **Create App** (choose **Other** or **Business** as the app type).

### 2. Add Instagram Use Case / Product
1. In the app dashboard, navigate to **Use Cases** or **Add Product**.
2. Select **Manage messaging & content on Instagram** (or **Instagram Platform** > **Instagram API with Instagram Login**).

### 3. Retrieve Instagram Client ID & Secret
1. In the left sidebar, navigate to:
   **Instagram Platform** > **API setup with Instagram login** > **3. Set up Instagram business login** > **Business login settings** (or **Customize use case > Instagram**).
2. On this page, you will find:
   - 🔑 **Instagram App ID**: This is your **Client ID** for n8n.
   - 🔒 **Instagram App Secret**: Click **Show** (enter your account password if prompted). This is your **Client Secret** for n8n.

> [!IMPORTANT]
> **Do NOT use the Facebook App ID** from the top header of the Meta Dashboard. You must use the specific **Instagram App ID** found inside the Instagram Platform settings.

### 4. Add n8n OAuth Callback URL
1. Open n8n and create a new **Instagram OAuth2 API** credential.
2. Copy the **OAuth Callback URL** displayed in the modal (e.g. `https://your-n8n-instance.com/rest/oauth2-credential/callback`).
3. Back in Meta App Dashboard under **Business login settings > Valid OAuth Redirect URIs**, paste the callback URL.
4. Click **Save Changes**.

---

## 🔒 Required OAuth Permissions / Scopes

The node uses the latest official Instagram Business Login scopes:
* `instagram_business_basic`: Read profile info and basic media data.
* `instagram_business_content_publish`: Upload and publish photos, videos, reels, stories, and carousels.
* `instagram_business_manage_messages`: Send and receive direct messages.
* `instagram_business_manage_comments`: Moderate, create, reply to, and delete comments.

---

## 🚀 Installation in n8n

### Option 1: Community Nodes UI (Recommended)
1. Open your **n8n instance**.
2. Go to **Settings** > **Community Nodes**.
3. Click **Install a community node**.
4. Enter the package name: `@rizkifirmansyah/n8n-nodes-instagram-api`
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
```

In your n8n root / custom nodes folder:
```bash
npm link @rizkifirmansyah/n8n-nodes-instagram-api
```

---

## 🛠️ Credentials Configuration in n8n

### 1. Instagram OAuth2 API (Business Login - Recommended)
- **Client ID (Instagram App ID)**: Your Instagram App ID from Meta Dashboard.
- **Client Secret (Instagram App Secret)**: Your Instagram App Secret.
- **Scope**: `instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments` (editable).
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
│       ├── Instagram.node.ts              # Main Node Controller & Dispatcher
│       ├── Instagram.node.json            # Community Node Metadata
│       ├── InstagramTool.node.ts          # Dedicated AI Agent Tool Sub-Node
│       ├── InstagramTool.node.json        # AI Agent Tool Metadata
│       ├── GenericFunctions.ts            # API Request Helper, Polling & Pagination
│       ├── instagram.svg                  # Node Icon
│       ├── handlers/                      # Modular Action & Execution Handlers
│       │   ├── UserHandler.ts             # User Profile & Insights Execution
│       │   ├── MediaHandler.ts            # Media & Publishing Execution
│       │   ├── CommentHandler.ts          # Comment Moderation Execution
│       │   ├── MessageHandler.ts          # Direct Messaging Execution
│       │   ├── InsightHandler.ts          # Insights & Analytics Execution
│       │   ├── MentionHandler.ts          # Mention & Tag Execution
│       │   └── CustomHandler.ts           # Custom Graph API Execution
│       └── descriptions/                  # Modular UI & Parameter Definitions
│           ├── user/                      # User operations & fields
│           ├── media/                     # Media operations & fields
│           ├── comment/                   # Comment operations & fields
│           ├── message/                   # Message operations & fields
│           ├── insight/                   # Insight operations & fields
│           ├── mention/                   # Mention operations & fields
│           ├── custom/                    # Custom request operations & fields
│           └── index.ts                   # Master descriptions export
├── index.ts                               # Package Entry Point
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📄 License

[MIT License](LICENSE) © 2026 Rizki Firmansyah

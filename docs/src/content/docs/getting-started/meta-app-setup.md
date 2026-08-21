---
title: Meta App & OAuth Setup
description: Step-by-step guide to configuring your Meta Developer App for Instagram Login.
sidebar:
  order: 3
---

# Meta App & OAuth Setup

To connect n8n to Instagram, you need an **Instagram App ID** (Client ID) and **Instagram App Secret** (Client Secret) from Meta for Developers.

Follow these step-by-step instructions:

---

## 1. Create a Meta Developer App

1. Go to [Meta for Developers Portal](https://developers.facebook.com/apps) and log in with your Meta account.
2. Click **Create App** in the upper right corner.
3. Select **Other** or **Business** as the use case/app type, then click **Next**.
4. Choose **Business** as the app type, enter your App Name and Contact Email, and click **Create App**.

---

## 2. Add Instagram Login Product

1. In your app dashboard left sidebar, click **Use Cases** or **Add Product**.
2. Look for **Manage messaging & content on Instagram** or **Instagram Platform** > **Instagram API with Instagram Login**.
3. Click **Set Up**.

---

## 3. Retrieve Instagram App ID & Secret

1. In the left sidebar, navigate to:
   ```text
   Instagram Platform
     └── API setup with Instagram login
           └── 3. Set up Instagram business login
                 └── Business login settings
   ```
2. Locate the following credentials:
   - 🔑 **Instagram App ID**: This will be your **Client ID** in n8n.
   - 🔒 **Instagram App Secret**: Click **Show** (enter your account password if prompted). This will be your **Client Secret** in n8n.

:::caution[Important: Do NOT Use Facebook App ID]
Do **NOT** copy the Facebook App ID displayed in the top header bar of the Meta Dashboard. You must use the specific **Instagram App ID** found inside the Instagram Platform settings.
:::

---

## 4. Set OAuth Redirect URI (Callback URL)

1. Open n8n and create a new **Instagram OAuth2 API** credential.
2. Copy the **OAuth Callback URL** shown in the credential modal (e.g., `https://n8n.your-domain.com/rest/oauth2-credential/callback`).
3. In Meta App Dashboard, go to **Business login settings** > **Valid OAuth Redirect URIs**.
4. Paste your n8n callback URL into the field.
5. Click **Save Changes**.

---

## 5. Add Instagram Test Users (Development Mode)

While your Meta App is in **Development Mode**:
1. In Meta App Dashboard, navigate to **App Roles** > **Roles** > **Instagram Testers**.
2. Click **Add Instagram Testers** and enter your Instagram username.
3. Open the Instagram app on your phone (or web) with that account, go to **Settings & Privacy** > **Website Permissions** > **Apps and Websites** > **Tester Invites**, and accept the invite.
4. Your account is now authorized to log in during development.

---
title: Credentials Configuration
description: How to configure Instagram OAuth2 and Access Token credentials in n8n.
sidebar:
  order: 4
---

# Credentials Configuration

The node supports two authentication types: **OAuth2 (Business Login)** and **Access Token (Direct / Long-Lived Token)**.

---

## 1. Instagram OAuth2 API (Recommended)

OAuth2 is the recommended approach for automated token refreshing and standard Meta authorization flow.

### Credential Fields

| Field | Description | Default Value |
| :--- | :--- | :--- |
| **Client ID** | Instagram App ID from Meta Dashboard | *(Required)* |
| **Client Secret** | Instagram App Secret from Meta Dashboard | *(Required)* |
| **Scope** | Comma-separated list of OAuth permissions | `instagram_business_basic, instagram_business_content_publish, instagram_business_manage_messages, instagram_business_manage_comments` |
| **API Version** | Meta Graph API Version | `v26.0` |
| **Base URL** | Instagram Graph API Endpoint | `https://graph.instagram.com` |

### How to Connect

1. In n8n, go to **Credentials** > **New Credential**.
2. Select **Instagram OAuth2 API (Business Login)**.
3. Paste your **Client ID** and **Client Secret**.
4. Click **Connect my account** (or **Sign in with Instagram**).
5. A popup window will prompt you to log into Instagram and grant the requested permissions.
6. Click **Save**.

---

## 2. Instagram Access Token API

If you generate direct User Access Tokens or Long-Lived Tokens (valid for 60 days) via Meta Graph API Explorer or custom token workflows, use this credential type.

### Credential Fields

| Field | Description | Default Value |
| :--- | :--- | :--- |
| **Access Token** | Short-lived or 60-day Long-Lived User Access Token | *(Required)* |
| **API Version** | Meta Graph API Version | `v26.0` |
| **Base URL** | Instagram Graph API Endpoint | `https://graph.instagram.com` |

:::tip[Long-Lived Tokens]
Short-lived Instagram user tokens expire after 1 hour. You can exchange them for 60-day long-lived tokens using Meta's `access_token` exchange endpoint or custom workflows.
:::

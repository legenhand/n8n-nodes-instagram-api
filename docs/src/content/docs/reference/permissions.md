---
title: Permissions & Scopes Reference
description: Complete reference for Meta OAuth scopes required by the Instagram node.
sidebar:
  order: 1
---

# Permissions & Scopes Reference

Meta Graph API requires specific permissions (OAuth scopes) depending on which resources and endpoints your workflow accesses.

---

## Supported Scopes

| Scope | Description | Required For |
| :--- | :--- | :--- |
| **`instagram_business_basic`** | Read profile info, account type, follower count, and media metadata. | `User: getMe, get`, `Media: get`, `Insight: getAccountInsights` |
| **`instagram_business_content_publish`** | Upload and publish photos, videos, Reels, stories, and carousels. | `Media: publishPhoto, publishVideo, publishCarousel, publishStory, delete` |
| **`instagram_business_manage_messages`** | Send and read direct messages and conversations. | `Message: sendText, sendMedia, getConversations, getMessages` |
| **`instagram_business_manage_comments`** | Read, create, reply to, hide, unhide, and delete comments & mentions. | `Comment: all operations`, `Mention: all operations` |

---

## Development vs Production Mode

### In Development Mode
- You and any Instagram accounts registered as **Instagram Testers** in the Meta App Dashboard can authenticate and test all above permissions without submitting for Meta App Review.

### In Production / Live Mode (App Review)
- If you intend to connect third-party users' Instagram accounts (outside of designated App Testers/Admins), you will need to submit each permission for **Meta App Review** in your Meta Developer App dashboard.

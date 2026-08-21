---
title: Introduction
description: Overview of the n8n Instagram API Community Node.
sidebar:
  order: 1
---

# Introduction

**`@rizkifirmansyah/n8n-nodes-instagram-api`** is an n8n community node that integrates with the **Instagram API with Instagram Login** (also known as *Business Login for Instagram*) powered by Meta Graph API `v26.0`.

Unlike traditional Instagram nodes that require your Instagram account to be connected to a Facebook Page, this node communicates directly with Instagram Professional accounts (Business & Creator) using Instagram's modern authentication and publishing endpoints.

---

## Why Use This Node?

- **No Facebook Page Requirement**: Connect directly to Instagram Professional accounts via Instagram Business Login.
- **Full Media Publishing Suite**: Upload Single Photos, Instagram Reels, Carousels (photos & videos), and Stories with built-in asynchronous status polling.
- **Direct Messaging API**: Send text and rich media messages, and inspect direct conversation threads.
- **Comment Automation**: Automatically reply to comments, moderate toxic messages, or hide/delete spam.
- **Analytics & Insights**: Retrieve daily account reach, views, engagement, profile visits, and media-level metrics.
- **AI Agent Tool (LangChain)**: Connects directly to the `Tool` port of the n8n **AI Agent** node for autonomous workflow execution.
- **Direct Graph API Passthrough**: Execute arbitrary Meta Graph API requests with automated authentication handling.

---

## Meta Graph API Version

This node is built against Meta Graph API **`v26.0`** using base URL `https://graph.instagram.com`.

---

## Next Steps

- Check out the [Installation Guide](/getting-started/installation/) to install the node into your n8n instance.
- Follow the [Meta App & OAuth Setup Guide](/getting-started/meta-app-setup/) to obtain your Instagram App ID and Secret.

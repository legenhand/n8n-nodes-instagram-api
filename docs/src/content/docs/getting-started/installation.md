---
title: Installation
description: How to install the Instagram API node in n8n.
sidebar:
  order: 2
---

# Installation

You can install this node into n8n using either the graphical Community Nodes UI or via terminal / Docker.

---

## Option 1: Community Nodes UI (Recommended)

1. Open your **n8n instance** dashboard.
2. Navigate to **Settings** (gear icon in the bottom left) > **Community Nodes**.
3. Click **Install a community node**.
4. Enter the package name:
   ```text
   @rizkifirmansyah/n8n-nodes-instagram-api
   ```
5. Check the agreement checkbox and click **Install**.
6. Once installed, the node **Instagram** and sub-node **Instagram Tool** will appear in the node creation palette.

---

## Option 2: Docker Environment

If you are running n8n via Docker or Docker Compose, you can install the community node during startup or by building a custom Dockerfile.

### Using Dockerfile

```dockerfile
FROM n8nio/n8n:latest

USER root
RUN npm install -g @rizkifirmansyah/n8n-nodes-instagram-api
USER node
```

### Using Environment Variable in `docker-compose.yml`

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    environment:
      - N8N_COMMUNITY_PACKAGES_ENABLED=true
    volumes:
      - n8n_data:/home/node/.n8n
    ports:
      - "5678:5678"

volumes:
  n8n_data:
```

---

## Option 3: Local / Development Installation

If you are developing or testing locally:

```bash
# 1. Clone repository
git clone https://github.com/legenhand/n8n-nodes-instagram-api.git
cd n8n-nodes-instagram-api

# 2. Install dependencies & build
bun install
bun run build

# 3. Link package globally
bun link

# 4. In your n8n root or ~/.n8n/custom directory
npm link @rizkifirmansyah/n8n-nodes-instagram-api
```

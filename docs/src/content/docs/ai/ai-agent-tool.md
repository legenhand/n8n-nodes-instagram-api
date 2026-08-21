---
title: AI Agent Tool (LangChain Integration)
description: Connect the Instagram node to n8n's AI Agent node as a dynamic tool.
sidebar:
  order: 1
---

# AI Agent Tool (LangChain Integration)

This community node has native support for n8n's **Advanced AI & LangChain** ecosystem. It can be attached as a **Tool** to the **AI Agent** node.

---

## How It Works

When connected as a tool to an AI Agent:
1. The AI Agent automatically discovers all operations (Publish Photo, Post Comment, Reply to Comment, Send DM, Read Insights, etc.).
2. The Large Language Model (e.g. OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Gemini 2.0 Flash) analyzes user requests and decides autonomously when to call the Instagram tool and with what parameters.
3. Execution results are returned back to the LLM for synthesis.

---

## Setup Steps

1. In your n8n workflow canvas, add an **AI Agent** node.
2. Search for **Instagram** and drag the node onto the canvas.
3. Connect the output port of the **Instagram** node to the **Tools** input port (bottom port) of the **AI Agent** node.
4. Select your Instagram credentials.
5. In the AI Agent's prompt or system message, give instructions such as:
   ```text
   You are an autonomous Instagram Social Media Manager assistant.
   You have access to the Instagram tool to look up account insights, reply to recent comments, send DMs, or publish drafted posts.
   Always verify the information before publishing.
   ```
6. Trigger the workflow with chat messages or webhooks!

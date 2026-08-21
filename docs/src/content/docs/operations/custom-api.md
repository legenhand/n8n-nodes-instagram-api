---
title: Custom Graph API Request
description: Send authenticated raw HTTP requests to any Meta Graph API endpoint.
sidebar:
  order: 7
---

# Custom Graph API Request

The **Custom Graph API Request** (`customApiCall`) operation allows you to execute arbitrary HTTP requests directly against Meta Graph API `v26.0` endpoints.

This is ideal if Meta introduces a brand new feature or you need to access specialized Instagram endpoints not yet represented in the standard dropdowns.

---

## Configuration

| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| **HTTP Method** | Options | `GET`, `POST`, `DELETE` | `GET` |
| **Endpoint / Path** | String | Endpoint path (relative to base URL) | `/me/media` |
| **Query Parameters** | Key-Value Collection | Query parameters appended to URL | `fields: id,caption,permalink` |
| **Body Parameters** | JSON / Key-Value | Payload sent in the request body (for POST) | `{"caption": "Hello world"}` |

---

## Example: Querying Custom Media Endpoints

```text
HTTP Method: GET
Path: /me/media
Query Parameters:
  fields: id,caption,media_type,media_url,like_count,comments_count
  limit: 25
```

All requests automatically attach the active OAuth2 Bearer token or User Access Token without manual header configuration.

# PlugMail – Comprehensive System Design

# 1. Overview

## 1.1 Introduction

PlugMail is a developer-first email infrastructure SaaS platform that enables developers to send transactional emails using their own Gmail credentials through a simple REST API.

The platform abstracts:

* SMTP setup complexity
* Email template management
* Email analytics
* Email testing
* Retry handling
* API authentication

PlugMail is focused on:

* Indie hackers
* Small developers
* MVP builders
* Startup founders
* Student developers

---

# 2. Objectives

## Primary Goals

* Provide extremely simple email integration
* Eliminate SMTP setup frustration
* Enable API-based email sending from any platform
* Provide reusable templates
* Offer analytics and monitoring
* Support scalable SaaS architecture

---

# 3. Product Features

# 3.1 Authentication System

## Features

* Google Login using Firebase Authentication
* Secure session management
* User onboarding
* Protected dashboard routes

---

# 3.2 API Key Management

## Features

* Generate API keys
* Revoke API keys
* Multiple API keys support
* Copy API keys securely
* Usage tracking per key

## Example API Key

```txt id="q1vcz1"
pk_live_xxxxxxxxxxxxxx
```

---

# 3.3 Connected Gmail Accounts

## Features

* Add Gmail account
* Store App Password securely
* Multiple Gmail accounts
* Default sender selection
* Gmail credential verification

## Required Credentials

* Gmail Address
* Google App Password

---

# 3.4 Template Management System

## Features

* Create templates
* Edit templates
* Delete templates
* Duplicate templates
* Categorize templates
* Use variables/placeholders
* Live preview

---

# 3.5 Premade Templates

## Categories

* Welcome Emails
* OTP Verification
* Password Reset
* SaaS Notifications
* Order Confirmation
* Payment Receipt
* Newsletter
* Security Alert

---

# 3.6 Email Testing Playground

## Features

* Send test email
* Preview rendered template
* Test variables
* Test API integration

---

# 3.7 Analytics Dashboard

## Metrics

* Total Emails Sent
* Failed Emails
* Success Rate
* Daily Usage
* API Usage
* Most Used Templates

## Future Metrics

* Open Rate
* Click Rate
* Bounce Tracking

---

# 4. System Architecture

# 4.1 High-Level Architecture

```txt id="d6v2s0"
Client Apps
(Node, Python, Mobile, Web)
        ↓
REST API Gateway
        ↓
Authentication Middleware
        ↓
Business Logic Layer
        ↓
Firebase Firestore
        ↓
Gmail SMTP (Nodemailer)
```

---

# 5. Technology Stack

# 5.1 Frontend

## Stack

* React
* Vite
* Tailwind CSS
* Firebase Auth
* React Router

## Notes

Frontend UI implementation must strictly follow:

```txt id="t1h7o3"
UI.md
```

All UI components, layouts, spacing, typography, color system, animations, and interactions must be based on specifications defined in `UI.md`.

---

# 5.2 Backend

## Stack

* Node.js
* Express.js
* Nodemailer
* Firebase Admin SDK

---

# 5.3 Database

## Stack

* Firebase Firestore

---

# 5.4 Hosting

## Frontend

* Vercel

## Backend

* Railway / Render

---

# 6. Database Design

# 6.1 users Collection

```json id="6p4e7s"
{
  "uid": "",
  "email": "",
  "name": "",
  "plan": "free",
  "createdAt": ""
}
```

---

# 6.2 apiKeys Collection

```json id="zk5r8d"
{
  "userId": "",
  "key": "",
  "active": true,
  "createdAt": ""
}
```

---

# 6.3 emailAccounts Collection

```json id="qf9k0l"
{
  "userId": "",
  "provider": "gmail",
  "email": "",
  "encryptedPassword": "",
  "isDefault": true,
  "createdAt": ""
}
```

---

# 6.4 templates Collection

```json id="d0p3mx"
{
  "userId": "",
  "name": "",
  "category": "",
  "subject": "",
  "html": "",
  "createdAt": ""
}
```

---

# 6.5 emailLogs Collection

```json id="n3k7vb"
{
  "userId": "",
  "templateId": "",
  "to": "",
  "subject": "",
  "status": "sent",
  "provider": "gmail",
  "timestamp": "",
  "error": ""
}
```

---

# 7. Backend API Design

# 7.1 Authentication

All API requests must include:

```txt id="b8j4kp"
x-api-key
```

---

# 7.2 API Endpoints

## Send Email

```txt id="j4q9mc"
POST /api/send
```

### Request Body

```json id="s6v1qw"
{
  "to": "user@gmail.com",
  "template": "welcome",
  "variables": {
    "name": "Atharva"
  }
}
```

---

## Create Template

```txt id="o7x2zn"
POST /api/templates
```

---

## Get Templates

```txt id="f2r8la"
GET /api/templates
```

---

## Generate API Key

```txt id="u5n9gw"
POST /api/keys/create
```

---

## Get Analytics

```txt id="w1d6ky"
GET /api/analytics
```

---

# 8. Email Rendering System

# 8.1 Variable Injection

Example:

```html id="t8x3pb"
<h1>Welcome {{name}}</h1>
```

Rendered:

```html id="k7m2ce"
<h1>Welcome Atharva</h1>
```

---

# 8.2 Rendering Flow

```txt id="y9q5vn"
Fetch Template
    ↓
Inject Variables
    ↓
Generate Final HTML
    ↓
Send via SMTP
```

---

# 9. Email Sending Flow

```txt id="u2m8tr"
API Request
    ↓
Validate API Key
    ↓
Fetch User
    ↓
Fetch Gmail Credentials
    ↓
Decrypt Credentials
    ↓
Render Template
    ↓
Send Email
    ↓
Store Logs
    ↓
Return Response
```

---

# 10. Security Design

# 10.1 Encryption

## Requirements

* Encrypt Gmail App Passwords
* Never store plaintext credentials
* Use AES-256 encryption

---

# 10.2 API Security

## Requirements

* API Key validation
* Rate limiting
* Request validation
* Helmet middleware
* CORS protection

---

# 10.3 Sensitive Data Rules

## Must Never:

* Expose Gmail credentials
* Return passwords in APIs
* Store plaintext app passwords
* Log sensitive credentials

---

# 11. Analytics System

# 11.1 Current Analytics

* Emails sent
* Emails failed
* Daily statistics
* Usage history
* Template usage

---

# 11.2 Future Analytics

* Open tracking
* Click tracking
* Geographic stats
* Device stats

---

# 12. Scalability Plan

# Phase 1

* Gmail-only support
* Single server deployment
* Firestore database

---

# Phase 2

* Queue system using Redis + BullMQ
* Retry mechanism
* Multi-provider support

---

# Phase 3

* Dedicated email workers
* Webhooks
* Team workspaces
* AI template generation

---

# 13. Rate Limits

## Free Plan

* 200 emails/day

## Future Paid Plan

* Higher limits
* Advanced analytics
* Priority delivery

---

# 14. Error Handling

## Common Errors

* Invalid API key
* Gmail authentication failure
* SMTP rate limit exceeded
* Invalid template variables

---

# 15. Future Enhancements

## Planned Features

* Drag-and-drop email builder
* AI template generation
* Multi-provider support
* Scheduled emails
* Team collaboration
* Webhooks
* SDKs for Node/Python

---

# 16. Development Guidelines

## Backend

* Use modular architecture
* Separate services/controllers/routes
* Use async/await consistently

---

## Frontend

* Follow `UI.md`
* Use reusable components
* Responsive design mandatory

---

# 17. Conclusion

PlugMail aims to provide:

* Simple email integration
* Fast developer onboarding
* Clean API experience
* Reusable templates
* Reliable email delivery

The platform focuses on developer experience and simplicity while leveraging Gmail SMTP for quick and low-cost transactional email infrastructure.

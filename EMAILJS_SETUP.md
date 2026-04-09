# EmailJS Setup Guide

## Current Status
The contact form uses EmailJS for sending emails. Environment variables are checked but need to be configured.

## Setup Steps

### 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

### 2. Create Email Service
1. Go to Email Services
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your email account
5. Copy the **Service ID**

### 3. Create Email Template
1. Go to Email Templates
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. Copy the **Template ID**

### 4. Get Public Key
1. Go to Account > General
2. Copy your **Public Key**

### 5. Add to Environment Variables

Create `.env.local` file:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 6. Add to Vercel
1. Go to your Vercel project
2. Settings > Environment Variables
3. Add all three variables
4. Redeploy

## Testing
1. Run `npm run dev`
2. Go to contact form
3. Submit a test message
4. Check your email

## Fallback
If EmailJS is not configured, the form will show a message to email directly at: eshfaqnabi11@gmail.com

## Free Tier Limits
- 200 emails/month
- Upgrade if you need more

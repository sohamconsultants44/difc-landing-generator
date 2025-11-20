# API Keys Guide

## 🔑 API Keys Required

### ✅ **NO API KEYS REQUIRED FOR CORE FUNCTIONALITY**

The system is designed to work **without any external API keys** using:

- **Ollama** (Local LLM) - Already installed and working
- **Local Data Processing** - All data processing happens locally

---

## 📋 Optional API Keys (For Enhanced Features)

### 1. **Google Analytics / Google Tag Manager** (Optional)
**Purpose:** Analytics tracking for generated landing pages

**Where to Add:**
- In the campaign input form
- Or set as environment variables:
  ```env
  GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
  GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
  ```

**How to Get:**
1. Go to https://analytics.google.com
2. Create a property
3. Get your Measurement ID (G-XXXXXXXXXX)

**Not Required For:** Core landing page generation

---

### 2. **Vercel / Azure Deployment** (Optional - For Deployment)
**Purpose:** One-click deployment of generated pages

**Vercel:**
- Sign up at https://vercel.com
- Install Vercel CLI: `npm i -g vercel`
- Run `vercel login` and authenticate
- No API key needed - uses CLI authentication

**Azure:**
- Sign up at https://azure.microsoft.com
- Create Azure App Service or Static Web App
- Use Azure CLI: `az login`
- No API key needed - uses CLI authentication

**Not Required For:** Local development and testing

---

### 3. **Sitecore BYOC** (Optional - For Sitecore Integration)
**Purpose:** Export components for Sitecore BYOC

**How to Get:**
- Contact your Sitecore administrator
- Get Sitecore instance URL and credentials
- Configure in `.env`:
  ```env
  SITECORE_URL=https://your-sitecore-instance.com
  SITECORE_USERNAME=your-username
  SITECORE_PASSWORD=your-password
  ```

**Not Required For:** Component generation (components are generated, export is optional)

---

## 🚀 Current Setup Status

### ✅ Working Without API Keys:
- ✅ Landing page generation
- ✅ Campaign data processing
- ✅ Insights generation
- ✅ Template creation
- ✅ Explanation PDF generation
- ✅ All AI agents (using Ollama)

### ⚠️ Optional Features (Need API Keys):
- ⚠️ Analytics tracking (Google Analytics)
- ⚠️ One-click deployment (Vercel/Azure)
- ⚠️ Sitecore export (Sitecore credentials)

---

## 📝 Environment Variables (.env)

Create a `.env` file in the root directory:

```env
# Ollama Configuration (Already Working)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral

# API Ports
API_PORT=3001
WEB_PORT=3000

# Optional: Google Analytics
GOOGLE_ANALYTICS_ID=
GOOGLE_TAG_MANAGER_ID=

# Optional: Sitecore
SITECORE_URL=
SITECORE_USERNAME=
SITECORE_PASSWORD=
```

**Note:** The `.env` file is already created and configured. You don't need to add any API keys unless you want the optional features above.

---

## 🎯 Summary

**For Core Functionality:** ✅ **NO API KEYS NEEDED**

**For Optional Features:**
- Analytics: Google Analytics ID (optional)
- Deployment: Vercel/Azure CLI (no API key, just login)
- Sitecore: Sitecore credentials (optional)

**Current Status:** Everything works without API keys! 🎉


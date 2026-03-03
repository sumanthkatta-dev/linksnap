# 🚀 LinkSnap Deployment Guide - Backend Proxy Setup

## Overview

Your LinkSnap app now has a **secure backend API proxy** that keeps your Gemini API key safe on the server, away from user exposure.

---

## 📋 Architecture

```
User Browser          →  Your App (No API Key)
                            ↓
                      Backend Proxy
                            ↓
                      Gemini API (API Key Safe Here)
```

**Key Benefits:**
- ✅ API key never exposed to users
- ✅ User requests proxied securely
- ✅ Ready for production
- ✅ Scalable infrastructure

---

## 🎯 Quick Start (Netlify)

### Step 1: Install Dependencies

```bash
npm install --legacy-peer-deps
npm install -D @netlify/functions @types/node
```

### Step 2: Get Your Google Gemini API Key

1. Go to https://aistudio.google.com/apikey
2. Create a new API key
3. Copy it (keep it secret!)

### Step 3: Deploy to Netlify

#### Option A: Using Netlify CLI (Recommended)

```bash
npm install -g netlify-cli
netlify login
netlify init
```

Then add environment variables:

```bash
netlify env:set VITE_GEMINI_API_KEY "your-api-key-here"
```

#### Option B: Using Netlify Dashboard

1. Push your code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your repository
5. In **Build settings**, leave defaults (Vite will auto-build)
6. Add Environment Variables:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: Your actual Google Gemini API key

### Step 4: Deploy

```bash
npm run build
netlify deploy --prod
```

---

## 🔒 Security Configuration

### Environment Variables (Netlify Dashboard)

Set these in **Site Settings → Build & Deploy → Environment**:

```
VITE_GEMINI_API_KEY = your_actual_gemini_key
ALLOWED_ORIGINS = https://yourdomain.com
NODE_ENV = production
```

### File Structure

```
netlify/
├── functions/
│   └── analyze.ts          # Backend proxy (SECRET - API key stays here)
netlify.toml                 # Deployment configuration
services/
├── geminiService.ts         # Updated to use proxy
├── proxyService.ts          # NEW: Proxy caller
├── apiKeyService.ts         # API key management
└── storageService.ts        # Data persistence
```

---

## 🧪 Testing Locally

### Test with Netlify Functions

```bash
npm install -g netlify-cli
netlify dev
```

This starts:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8888/.netlify/functions/analyze`

### Test Image Upload

1. Open http://localhost:3000
2. Upload an image
3. Click analyze
4. Check browser console for success

---

## 📊 API Endpoint Reference

### Proxy Function: `/analyze`

**Request:**
```bash
POST /.netlify/functions/analyze
Content-Type: application/json

{
  "imageUrl": "data:image/jpeg;base64,...",  // Optional
  "url": "https://example.com",              // Optional
  "userQuery": "What is this?"               // Optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Product Name",
    "description": "What it does",
    "category": "Technology",
    "tags": ["tag1", "tag2"],
    "sentiment": "Positive"
  }
}
```

---

## 🛠️ Alternative Hosting Options

### Vercel Functions

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Rename files:**
   ```
   netlify/functions/analyze.ts → api/analyze.ts
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set env variables in Vercel dashboard**

### AWS Lambda + API Gateway

1. Bundle the function
2. Upload to Lambda
3. Create API Gateway endpoint
4. Update `VITE_API_ENDPOINT`

### Heroku

1. Create `server.ts` (Express wrapper)
2. Deploy with `git push heroku main`
3. Set `VITE_GEMINI_API_KEY` env var

---

## 📝 Update Environment Files

### `.env.local` (Development)

```env
# Local development - direct API (for testing)
VITE_GEMINI_API_KEY=your_dev_key_here
VITE_API_ENDPOINT=http://localhost:8888/.netlify/functions/analyze
```

### `.env.production` (Production)

```env
# Will be empty - API key stored in Netlify dashboard
VITE_GEMINI_API_KEY=
VITE_API_ENDPOINT=https://yourdomain.com/.netlify/functions/analyze
```

---

## ✅ Pre-Deployment Checklist

- [ ] Google Gemini API key obtained
- [ ] Netlify account created
- [ ] Git repository ready
- [ ] `netlify.toml` in root directory
- [ ] `netlify/functions/analyze.ts` created
- [ ] `services/proxyService.ts` created
- [ ] `geminiService.ts` updated to use proxy
- [ ] `VITE_GEMINI_API_KEY` added to Netlify dashboard (NOT in code)
- [ ] Build test: `npm run build` passes
- [ ] Local test: `netlify dev` works
- [ ] CORS headers configured correctly

---

## 🚀 Final Deployment Steps

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Add backend API proxy"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to netlify.com
   - Click "New site from Git"
   - Select your LinkSnap repository

3. **Configure Build:**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables:**
   - `VITE_GEMINI_API_KEY`: Your actual key
   - `ALLOWED_ORIGINS`: Your production domain

5. **Deploy:**
   - Netlify auto-deploys on git push
   - Monitor build in dashboard
   - Site goes live when build succeeds ✅

---

## 🔍 Troubleshooting

### "API key not found"
- [ ] Check Netlify environment variables
- [ ] Verify key in dashboard matches actual key
- [ ] Rebuild site

### "CORS error"
- [ ] Check `ALLOWED_ORIGINS` in netlify.toml
- [ ] Verify domain matches your production URL
- [ ] Clear browser cache

### "Function not found"
- [ ] Verify `netlify/functions/analyze.ts` exists
- [ ] Check `netlify.toml` configuration
- [ ] Run `netlify dev` to test locally

### "Request timeout"
- [ ] Check Gemini API quota
- [ ] Verify API key is valid
- [ ] Check network tab in browser DevTools

---

## 📚 Related Documentation

- [SECURITY.md](./SECURITY.md) - Security implementation details
- [DEPLOYMENT.md](./DEPLOYMENT.md) - General deployment guide
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Google Gemini API Docs](https://ai.google.dev/tutorials/python_quickstart)

---

## 🎉 You're All Set!

Your LinkSnap app is now:
- ✅ Secure (API key protected)
- ✅ Production-ready (backend proxy)
- ✅ Scalable (serverless architecture)
- ✅ User data safe (local storage + proxy)

**Next steps:**
1. Deploy to Netlify
2. Test on production domain
3. Monitor analytics
4. Celebrate! 🚀

---

**Questions?** Check the troubleshooting section or review the code comments in `netlify/functions/analyze.ts`.

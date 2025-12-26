# LinkSnap Deployment & Production Guide

## 🚀 Pre-Deployment Checklist

### Security Review
- [ ] All API keys removed from codebase
- [ ] No hardcoded secrets in files
- [ ] `.env.local` added to `.gitignore`
- [ ] Environment variables use `VITE_` prefix
- [ ] Review all `console.log()` statements (remove sensitive data)

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] Run `npm run build` successfully
- [ ] Test data persistence in browser DevTools
- [ ] Verify backup/restore functionality
- [ ] Test with different data volumes

### Testing Checklist
- [ ] Upload multiple images
- [ ] Submit URLs for analysis
- [ ] Verify data persists after page refresh
- [ ] Test backup/restore
- [ ] Clear browser cache and verify old data loads
- [ ] Test on different browsers
- [ ] Test on mobile devices

---

## 📦 Build & Deployment

### Local Build
```bash
npm run build
npm run preview  # Test production build locally
```

### Environment Setup for Different Environments

#### Development
```bash
# .env.local (local machine only)
VITE_GEMINI_API_KEY=your_dev_key
```

#### Production (via Netlify/Vercel)
```bash
# Set via dashboard environment variables
VITE_GEMINI_API_KEY=your_production_key
VITE_API_ENDPOINT=https://your-api.com  # Optional backend proxy
```

---

## ⚠️ CRITICAL: Production Security Implementation

### OPTION 1: Environment Variables (Current - Development Only)
✅ Works for development  
❌ NOT RECOMMENDED for production  

**Issue**: API key is embedded in client bundle (visible to users)

### OPTION 2: Backend Proxy (Recommended for Production) ⭐

**Step 1: Create a Backend Proxy Function**

If using Netlify Functions:
```javascript
// netlify/functions/analyze.js
import { GoogleGenAI, Type } from "@google/genai";

exports.handler = async (event) => {
  // Authentication check
  const authToken = event.headers.authorization;
  if (!authToken) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const apiKey = process.env.GEMINI_API_KEY; // Server-side only!
  const ai = new GoogleGenAI({ apiKey });

  try {
    const body = JSON.parse(event.body);
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { text: body.prompt },
          ...(body.base64Data ? [{
            inlineData: {
              mimeType: "image/png",
              data: body.base64Data
            }
          }] : [])
        ],
      },
      config: {
        systemInstruction: "...your system prompt...",
        responseMimeType: "application/json",
        responseSchema: { /* schema */ }
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(JSON.parse(response.text))
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

**Step 2: Update Client Code**
```typescript
// services/geminiService.ts
export const analyzeResource = async (input: { 
  base64Data?: string, 
  url?: string 
}): Promise<AnalysisResult> => {
  const endpoint = import.meta.env.VITE_API_ENDPOINT || '/.netlify/functions/analyze';
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userAuthToken}` // User token, not API key!
    },
    body: JSON.stringify({
      prompt: input.url ? `Analyze: ${input.url}` : 'Identify this product',
      base64Data: input.base64Data
    })
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};
```

---

## 🔐 Security Best Practices for Production

### 1. API Key Management
```bash
# NEVER in client code ❌
const apiKey = "AIza..." 

# ONLY on server ✅
process.env.GEMINI_API_KEY = "AIza..."
```

### 2. CORS Configuration
```javascript
// Allow only your domain
const allowedOrigins = ['https://yourdomain.com'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

### 3. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10 // 10 requests per minute
});

app.post('/api/analyze', limiter, handler);
```

### 4. Authentication
```javascript
// Verify user before processing
app.use(authenticateUser); // Your auth middleware

app.post('/api/analyze', authenticateUser, handler);
```

### 5. Input Validation
```typescript
// Validate all inputs
const validateInput = (input: any): boolean => {
  if (!input.url && !input.base64Data) return false;
  if (input.url && !isValidUrl(input.url)) return false;
  if (input.base64Data && input.base64Data.length > 5000000) return false;
  return true;
};
```

---

## 📊 Monitoring & Logging

### Track API Usage
```javascript
app.post('/api/analyze', async (req, res) => {
  const userId = req.user.id;
  const timestamp = new Date();
  
  // Log request
  console.log(`[${timestamp}] User ${userId} - Analysis requested`);
  
  // Track in database
  await db.usage.create({
    userId,
    timestamp,
    type: 'analysis',
    status: 'success'
  });
});
```

### Monitor Errors
```javascript
// Catch and log errors
app.post('/api/analyze', async (req, res) => {
  try {
    // ... analysis code
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    // Send to error tracking service
    sentryClient.captureException(error);
  }
});
```

---

## 🚀 Deployment Platforms

### Netlify
```bash
# netlify.toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[context.production.environment]
  VITE_GEMINI_API_KEY = ""  # Leave empty, use functions only
```

### Vercel
```javascript
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}

// api/analyze.js
export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  // ... handler code
}
```

### Traditional Server (Node.js)
```javascript
// server.js
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const apiKey = process.env.GEMINI_API_KEY;

app.post('/api/analyze', async (req, res) => {
  // ... handler code
});

app.listen(3001, () => console.log('Server running'));
```

---

## 📱 Data Persistence in Production

### Browser Storage
- Data stored in `localStorage` automatically
- Persists across browser sessions
- Limited to ~5-10MB per domain
- No server sync needed (local-first)

### Backup Strategy
Users can:
1. Export data via "Backup" button
2. Download as JSON file
3. Import via "Restore" button

### Cloud Sync (Optional Future)
```typescript
// For future cloud sync implementation
export const syncToCloud = async (userId: string, data: ScanResult[]) => {
  const response = await fetch('/api/sync', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, data })
  });
  return response.json();
};
```

---

## 🧪 Testing Before Launch

### Load Testing
```bash
# Use tools like Apache Bench
ab -n 1000 -c 100 https://yourdomain.com

# Or k6
k6 run test-script.js
```

### Security Testing
```bash
# Check for exposed keys
git log --full-history -p -- .env* | grep -E "GEMINI|API"

# Scan dependencies
npm audit

# Check for vulnerabilities
npx snyk test
```

### Performance Testing
```bash
# Lighthouse audit
lighthouse https://yourdomain.com

# WebPageTest
# https://www.webpagetest.org/
```

---

## 📈 Post-Launch Monitoring

### Key Metrics
- API response time
- Error rate
- User retention
- Storage usage
- API quota consumption

### Alerting
Set up alerts for:
- API errors (5xx responses)
- High latency (>5s)
- High error rate (>5%)
- API quota near limit

---

## 🆘 Troubleshooting

### "API_KEY_NOT_CONFIGURED"
```bash
# Check environment variables
echo $VITE_GEMINI_API_KEY

# For Netlify
netlify env:list

# For Vercel
vercel env pull
```

### CORS Errors
```javascript
// Add CORS headers if using backend proxy
res.header('Access-Control-Allow-Origin', 'https://yourdomain.com');
res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type');
```

### Storage Quota Exceeded
- Users get warning at 5MB
- Old data automatically cleaned up
- Users can export/import data
- Consider implementing cloud sync

---

## 📋 Post-Deployment Tasks

- [ ] Monitor error rates for 24 hours
- [ ] Check API quota consumption
- [ ] Verify data persists correctly
- [ ] Test backup/restore on production
- [ ] Monitor user feedback
- [ ] Set up analytics
- [ ] Plan API key rotation schedule
- [ ] Document deployment process
- [ ] Create runbook for common issues

---

**Ready for production?** 🎉  
Follow this guide and your LinkSnap deployment will be secure and scalable!

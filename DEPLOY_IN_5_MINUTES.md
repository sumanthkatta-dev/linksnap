# 🚀 Deploy LinkSnap in 5 Minutes

## What We Just Added

✅ Backend API Proxy (keeps your API key safe on server)
✅ Netlify Functions (serverless backend)
✅ Secure client-proxy communication
✅ Production-ready architecture

---

## 🎯 Step-by-Step Deployment

### 1️⃣ Get API Key (2 min)

Go to: https://aistudio.google.com/apikey
- Click "Create API Key"
- Copy and save it securely

### 2️⃣ Connect to Netlify (2 min)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link your project
netlify init
```

### 3️⃣ Deploy (1 min)

```bash
# Build your app
npm run build

# Deploy to Netlify
netlify deploy --prod
```

### 4️⃣ Add API Key (1 min)

1. Go to your **Netlify Dashboard**
2. Click **Site Settings → Build & Deploy → Environment**
3. Add Environment Variable:
   - **Key:** `VITE_GEMINI_API_KEY`
   - **Value:** Your Google API key
4. Trigger a redeploy:
   ```bash
   netlify deploy --prod
   ```

---

## ✅ Done! Your App is Live

Your LinkSnap is now:
- 🔒 Secure (API key hidden on server)
- 🚀 Live on the internet
- ⚡ Fast (Netlify CDN)
- 💾 Data stays in user's browser

---

## 📍 What's Where

| File | Purpose |
|------|---------|
| `netlify/functions/analyze.ts` | Backend (API key is here - safe!) |
| `services/proxyService.ts` | Client calls this function |
| `services/geminiService.ts` | Updated to use proxy |
| `netlify.toml` | Deployment configuration |

---

## 🧪 Test Locally Before Deploy

```bash
npm install
npm run build

# Test with Netlify functions locally
netlify dev
```

Then open: http://localhost:3000

---

## ⚠️ Important Security Notes

**NEVER commit these to GitHub:**
- `.env.local` ❌
- API keys ❌
- Secrets ❌

**DO store in Netlify Dashboard:**
- `VITE_GEMINI_API_KEY` ✅
- Set via UI only ✅

---

## 🆘 Troubleshooting

**"Build failed"**
→ Run `npm run build` locally first

**"API key not found"**
→ Check Netlify environment variables

**"Function not working"**
→ Run `netlify dev` and check logs

**"CORS error"**
→ Check `netlify.toml` CORS settings

---

## 📚 Full Documentation

See [BACKEND_PROXY_SETUP.md](./BACKEND_PROXY_SETUP.md) for detailed setup

---

## 🎉 You're All Set!

Your app is now production-ready with a secure backend proxy!

**Your URL:** Check Netlify dashboard for your live site URL

Enjoy! 🚀

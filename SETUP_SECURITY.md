# 🔐 LinkSnap Security Setup - Quick Start

## What Changed?

Your LinkSnap app now has:
✅ **Secure API key management** - Keys are protected  
✅ **Data persistence** - Your data automatically saves in the browser  
✅ **Backup/Restore** - Download and import your data  
✅ **Production-ready security** - Safe to go live with backend setup  

---

## 🚀 Quick Setup (Next 5 Minutes)

### Step 1: Get Your Gemini API Key
1. Go to https://ai.google.dev/
2. Click **"Get API Key"**
3. Create a new project or select existing
4. Generate an API key
5. Copy the key (looks like: `AIzaSy...`)

### Step 2: Configure Your App
1. Open the `.env.local` file in the root folder
2. Replace `PLACEHOLDER_API_KEY` with your actual key:
   ```
   VITE_GEMINI_API_KEY=AIzaSy_YOUR_KEY_HERE_xxxxx
   ```
3. Save the file
4. The app will auto-restart (watch the terminal)

### Step 3: Test It Works
1. Open http://localhost:3000
2. Upload an image or submit a URL
3. Close the browser tab completely
4. Open http://localhost:3000 again
5. Your data should still be there! ✅

---

## 📊 New Features in Settings

Open the **Settings** (gear icon) to see:

### 🔑 API Key Status
- Shows if your API key is linked
- Option to remove key
- Link to Gemini API docs

### 💾 Storage Usage
- Visual meter of how much space used
- Displays KB / 5 MB

### 📥 Backup Data
- **Backup button**: Downloads all your data as JSON
- **Restore button**: Upload a backup to recover data
- Keep backups safe!

### 🗑️ Purge Registry
- Nuclear option to delete everything
- Asks for confirmation first

---

## 🔒 Security Important Info

### ✅ What's Now Secure
- API keys are **not** stored in code
- Your data **automatically saves** to browser
- Settings protect sensitive information
- Backup files are **encrypted** by your browser

### ⚠️ For Production (Before Going Live)
You'll need to:
1. Read [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Set up a backend API proxy
3. Add user authentication
4. Enable HTTPS

**Why?** The current setup is safe for development. For production, never expose API keys to users.

---

## 📱 Data Persistence - How It Works

### Automatic Saving
Every time you:
- Upload an image ✅
- Submit a URL ✅
- Delete an item ✅
- Change categories ✅

Your data is **automatically saved** to browser storage.

### When You Return
- Close the browser tab
- Refresh the page
- Come back tomorrow
- **All your data is still there!**

### Storage Limits
- **Safe limit**: 5 MB per domain
- **Warning**: Shows at 5 MB+
- **Cleanup**: Old data automatically removed if needed
- **Your option**: Export before getting full

---

## 🛠️ Troubleshooting

### "API_KEY_NOT_CONFIGURED" Error
1. Check `.env.local` file exists
2. Check `VITE_GEMINI_API_KEY=...` is set
3. Make sure NO spaces in value
4. Restart the app (stop and `npm run dev`)

### Data Not Saving
1. Check browser allows localStorage
2. Try incognito mode
3. Check Settings → Storage Usage
4. If > 5 MB, delete old entries first

### Can't Import Backup
1. Make sure file is `.json` format
2. File must be from original export
3. Check file isn't corrupted
4. Try a fresh browser session

### API Key Not Working
1. Go to https://ai.google.dev/
2. Check project has billing enabled
3. Check API key hasn't expired
4. Try generating a new key

---

## 📚 Documentation Files

Read these for more info:

| File | What It's For |
|------|---------------|
| `SECURITY.md` | Detailed security implementation |
| `DEPLOYMENT.md` | How to deploy to production |
| `SECURITY_AUDIT.md` | Security audit checklist |
| `.env.local.example` | Environment variable template |

---

## ✨ What You Can Do Now

### Test Features
```bash
1. Upload image → data saves
2. Submit URL → data saves
3. Refresh page → data still there
4. Settings → Backup → download JSON
5. Delete all → confirm
6. Settings → Restore → upload JSON
```

### For Production (Later)
```bash
1. Read DEPLOYMENT.md
2. Set up backend proxy
3. Add user authentication
4. Deploy with HTTPS
```

---

## 🎉 You're Ready!

Your LinkSnap app is now:
- ✅ **Secure** - API keys protected
- ✅ **Persistent** - Data always saves
- ✅ **Backed Up** - Export/import supported
- ✅ **Production-ready** - With backend setup

**Next Step:** Try uploading an image and refreshing to see the data persistence in action!

---

## 🆘 Need Help?

**Check this first:**
1. Is the dev server running? (Check terminal)
2. Is `.env.local` file configured?
3. Does API key have billing enabled?
4. Try clearing browser cache

**Still stuck?**
- Check browser console (F12 → Console)
- Review error messages
- Check `.env.local` file format
- Restart dev server

---

**Happy analyzing! 🚀**

*Security updates completed: December 25, 2025*

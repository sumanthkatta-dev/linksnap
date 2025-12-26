<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LinkSnap - AI-Powered Digital Archiving 🚀

A secure, production-ready application for identifying and cataloging software tools, web apps, and digital products using Google's Gemini API.

**[View your app in AI Studio](https://ai.studio/apps/drive/1G1JOsBkE8pS6eCk1kYYbMxkLDY38HprJ)**

---

## 🔐 Security Features (Latest Update - Dec 2025)

✅ **Secure API Key Management** - Protected environment variables  
✅ **Automatic Data Persistence** - Browser localStorage with auto-save  
✅ **Backup & Restore** - Export/import functionality  
✅ **Production-Ready** - Security best practices implemented  

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Configure API Key:**
   - Copy `.env.local.example` to `.env.local`
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```
   - Get a key: https://ai.google.dev/

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Local: http://localhost:3000
   - Network: http://192.168.1.x:3000

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| [SETUP_SECURITY.md](./SETUP_SECURITY.md) | Quick 5-minute setup guide |
| [SECURITY.md](./SECURITY.md) | Complete security implementation |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment guide |
| [SECURITY_AUDIT.md](./SECURITY_AUDIT.md) | Security audit checklist |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | What was implemented |

---

## ✨ Features

### 🎯 Core Functionality
- **Image Analysis** - Upload screenshots to identify products
- **URL Analysis** - Submit URLs for deep analysis
- **Category Detection** - Automatic categorization
- **Pricing Detection** - Extract pricing information
- **Platform Detection** - Identify compatible platforms

### 🔒 Security Features
- **Secure Storage** - Data persists in browser
- **API Protection** - Keys never exposed to client
- **Auto-Backup** - Export data as JSON
- **Error Handling** - Secure error messages
- **Rate Limiting Ready** - Production setup included

### 💾 Data Management
- **Auto-Save** - Every change is automatically saved
- **Backup** - Download all data as JSON
- **Restore** - Upload backups to recover data
- **Storage Monitor** - See how much space used
- **Clear All** - Nuclear option to delete everything

---

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
LinkSnap/
├── services/
│   ├── geminiService.ts        # Gemini API integration
│   ├── apiKeyService.ts        # Secure API key management (NEW)
│   └── storageService.ts       # Secure data storage (NEW)
├── components/
│   ├── SettingsDrawer.tsx      # Settings panel with backup/restore
│   ├── Uploader.tsx            # File/URL upload
│   ├── AnalysisCard.tsx        # Result display
│   └── ...other components
├── App.tsx                     # Main app component
├── types.ts                    # TypeScript types
├── vite.config.ts              # Build configuration
├── .env.local                  # API configuration (git-ignored)
├── .env.local.example          # Configuration template
└── ...documentation
```

---

## 🔐 Security Information

### For Development ✅
Your app is secure for development use with:
- Protected API keys via environment variables
- Automatic data persistence
- Backup/restore functionality

### For Production ⚠️
Before deploying, read [DEPLOYMENT.md](./DEPLOYMENT.md):
- Set up backend API proxy (critical)
- Add user authentication
- Enable HTTPS
- Configure CORS
- Implement rate limiting

---

## 🌐 Browser Support

- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 15+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 💾 Data Persistence

### How It Works
1. Data automatically saves to browser localStorage
2. Persists across browser sessions
3. Survives browser restarts
4. Can be exported/imported as JSON

### Storage Limits
- **Safe limit:** 5 MB per domain
- **Auto-cleanup:** Old data removed if needed
- **User control:** Manual export/import available

### Privacy
- All data stays in your browser
- Nothing synced to servers (unless you add that feature)
- Can clear all data anytime

---

## 🚀 Deployment

### Quick Deploy (Netlify)
```bash
npm run build
# Upload dist/ folder
```

### With Backend (Recommended for Production)
See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Netlify Functions setup
- Vercel serverless setup
- Traditional Node.js server setup
- Environment configuration
- Security best practices

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📝 License

MIT License - Feel free to use for personal or commercial projects

---

## 🆘 Support

### Having Issues?
1. Check [SETUP_SECURITY.md](./SETUP_SECURITY.md) for quick setup
2. Review [SECURITY.md](./SECURITY.md) for implementation details
3. Check browser console (F12) for errors
4. Ensure `.env.local` is configured

### For Production Help
See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment guide

---

## 🔄 Version History

### v1.0.4 - Security Hardened (Dec 2025)
- ✅ Secure API key management
- ✅ Automatic data persistence
- ✅ Backup/restore functionality
- ✅ Complete security documentation
- ✅ Production deployment guide

### Previous Versions
See git history for earlier changes

---

## 🎯 Roadmap

- [ ] User authentication system
- [ ] Cloud data sync
- [ ] Multi-device support
- [ ] Advanced analytics
- [ ] Sharing capabilities
- [ ] API endpoint for integrations

---

## 📞 Contact & Questions

- 📖 Read the documentation files
- 💬 Check existing issues
- 📧 Follow the guidelines in CONTRIBUTING.md

---

**Built with ❤️ using React, TypeScript, and Vite**

**Last Updated:** December 25, 2025

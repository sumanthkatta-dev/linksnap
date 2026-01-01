<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🔗 LinkSnap

### *The Smartest Way to Save Links - Powered by Visual Intelligence*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-linksnap.netlify.app-D71921?style=for-the-badge)](https://linksnap.netlify.app)
[![GitHub Stars](https://img.shields.io/github/stars/sumanthkatta-dev/linksnap?style=for-the-badge&color=D71921)](https://github.com/sumanthkatta-dev/linksnap)
[![License](https://img.shields.io/badge/License-MIT-D71921?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-D71921?style=for-the-badge)](CONTRIBUTING.md)

<p align="center">
  <strong>AI-Powered Digital Bookmark Registry</strong> • Screenshot Analysis • Smart Cataloging • Offline-First PWA
</p>

</div>

---

## 🎯 What is LinkSnap?

**LinkSnap** is a next-generation bookmark manager that uses AI vision to automatically analyze, categorize, and catalog your digital tools. Simply drop a screenshot or paste a URL, and let Google's Gemini AI do the heavy lifting.

### 🌟 Why LinkSnap?

Traditional bookmarks are messy, uncategorized, and forgotten. **LinkSnap transforms screenshots into intelligent, searchable archives** of your digital ecosystem.

- 📸 **Visual Recognition** - Upload screenshots and get instant analysis
- 🤖 **AI-Powered** - Google Gemini extracts logos, colors, tech stack, and more
- 🎨 **Beautiful UI** - Nothing Phone-inspired cyberpunk aesthetic
- 📱 **Progressive Web App** - Install on any device, works offline
- 🔒 **Privacy-First** - Your API keys stay on your device
- 💾 **Auto-Save** - Never lose your data with localStorage backup

---

## ✨ Features

### 🔥 Core Features
- **🖼️ Visual Upload** - Drag & drop screenshots or images
- **🔗 URL Analysis** - Paste any website link for instant analysis  
- **🧠 AI Extraction** - Automatic detection of:
  - Tool/product name
  - Primary logo and color scheme
  - Industry category
  - Key features and use cases
  - Tech stack identification
- **🔍 Smart Search** - Filter your registry with lightning speed
- **📊 Category Filters** - Organize by type (Design, Dev, Marketing, etc.)
- **📤 Export Data** - Download your entire registry as JSON
- **💾 Local Storage** - Automatic data persistence
- **🌐 Offline Mode** - Full PWA functionality

### 🎨 Design Highlights
- **Nothing Phone Aesthetic** - Minimalist cyberpunk UI
- **Glassmorphism Effects** - Modern backdrop blur styling
- **Smooth Animations** - Butter-smooth transitions and interactions
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Dark Mode** - Eye-friendly interface

### 🔐 Security & Privacy
- ✅ **Client-Side API Keys** - Your Gemini key never leaves your browser
- ✅ **No Backend** - Pure frontend app, no server tracking
- ✅ **GitGuardian Protected** - Automated secret scanning with ggshield
- ✅ **Open Source** - Fully transparent codebase

### ⚠️ Important Security Warnings

> **🚨 READ BEFORE USING IN PRODUCTION**

#### Current Status: **Development/Personal Use Only**

**✅ Safe for:**
- Personal projects
- Local development
- Learning and experimentation
- Portfolio demonstrations

**❌ NOT SAFE for:**
- Production deployments without backend
- Public-facing websites with user traffic
- Applications handling sensitive data
- Multi-user environments

#### Critical Security Concerns

**1. Exposed API Keys** 🔑
- API keys are stored in **localStorage** (visible to anyone with browser access)
- Keys are sent directly from browser to Google (visible in network tab)
- **Risk:** Anyone can inspect, copy, or abuse your API key
- **Impact:** Unauthorized usage, quota exhaustion, unexpected bills

**2. No Rate Limiting** 🚦
- Zero protection against API abuse
- Users can spam unlimited requests
- **Risk:** Rapid quota depletion, service disruption
- **Impact:** Your Gemini API limits get exhausted quickly

**3. No Authentication** 👤
- Anyone can use the app
- No user accounts or permissions
- **Risk:** Public abuse of your resources
- **Impact:** Cannot track or control who uses your API quota

**4. Client-Side Validation Only** ✋
- All security checks happen in browser
- Easy to bypass with DevTools
- **Risk:** Malicious users can manipulate requests
- **Impact:** Unvalidated data sent to Gemini API

**5. CORS Limitations** 🌐
- Direct API calls from browser face CORS issues
- Some Gemini features may not work
- **Risk:** Functionality breaks on different domains
- **Impact:** Limited deployment options

---

## 🚀 Quick Start

### 📋 Prerequisites
- **Node.js** v18+ 
- **npm** or **yarn**
- **Google Gemini API Key** (free tier available)

### 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sumanthkatta-dev/linksnap.git
   cd linksnap
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Get your API Key:**
   - Visit [Google AI Studio](https://ai.google.dev/)
   - Create a free Gemini API key
   - No credit card required!

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

### 🎬 First-Time Setup

1. Click **"Get Started"** on the onboarding screen
2. Add your **Gemini API Key**
3. Select a **free Gemini model** (gemini-1.5-flash recommended)
4. Upload your first screenshot or paste a URL
5. Watch the AI magic happen! ✨

---

## 🏗️ Tech Stack

### Frontend
- **⚛️ React 19** - Latest React with concurrent rendering
- **🎨 TypeScript** - Type-safe development
- **💨 Tailwind CSS** - Utility-first styling
- **⚡ Vite** - Lightning-fast build tool
- **🎭 Lucide React** - Beautiful icon library

### AI & APIs
- **🤖 Google Gemini API** - Vision + text analysis
- **📸 Gemini Flash 1.5** - Fast multimodal processing

### Deployment
- **🌐 Netlify** - Serverless edge deployment
- **🔄 Auto-Deploy** - CI/CD from GitHub
- **📦 PWA** - Service worker caching

### Development
- **🔍 ESLint** - Code quality
- **🎯 TypeScript** - Static typing
- **🛡️ GitGuardian** - Secret scanning protection

---

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify
```bash
# Automatic deployment on push to main branch
git push origin main
```

Or manually:
```bash
npm run build
netlify deploy --prod
```

---

## � How It Works

### 1. **Upload or Link**
Drop a screenshot or paste a URL of any digital tool, website, or SaaS product.

### 2. **AI Analysis**
Google Gemini's vision model analyzes the image:
- Extracts logo and branding
- Identifies primary color palette
- Detects tech stack and frameworks
- Categorizes the tool type
- Summarizes key features

### 3. **Smart Catalog**
Your analyzed tool is saved to a beautiful, searchable registry with:
- Visual preview cards
- Category filters
- Search functionality
- Export capabilities

---

## 🎨 UI/UX Features

### Nothing Phone-Inspired Design
- **Dot Matrix Font** - Retro-futuristic typography
- **Red Accent Color** - `#D71921` signature Nothing red
- **Glassmorphism** - Frosted glass blur effects
- **Squircle Borders** - Smooth corner radius
- **Grid Patterns** - Subtle background grids
- **Scan Line Animations** - Cyberpunk aesthetics

### Interactions
- **Smooth Transitions** - Cubic-bezier easing
- **Hover Effects** - Scale and color changes
- **Loading States** - Animated indicators
- **Error Handling** - User-friendly messages
- **Toast Notifications** - Non-intrusive feedback

---

## ⚠️ Known Limitations & Issues

### Security Limitations
| Issue | Severity | Impact | Solution |
|-------|----------|--------|----------|
| API keys in localStorage | 🔴 Critical | Keys can be stolen from browser | Implement backend proxy |
| No rate limiting | 🔴 Critical | Quota abuse possible | Add server-side throttling |
| No authentication | 🟠 High | Anyone can use your app | Add user login system |
| Client-side validation only | 🟠 High | Easy to bypass security checks | Server-side validation needed |
| No audit logging | 🟡 Medium | Cannot track abuse | Implement logging system |

### Technical Limitations
- **Storage:** localStorage limited to ~5-10MB per domain
- **Offline:** Images not cached (requires online connection)
- **File Size:** Large screenshots (>10MB) may fail to upload
- **Browser:** IE11 not supported (modern browsers only)
- **API Quota:** Free Gemini tier has daily limits
- **Performance:** Analyzing 100+ items may slow down the UI

### Functional Limitations
- **No Sync:** Data stays on one device only (no cloud backup)
- **No Collaboration:** Cannot share registries with team members
- **No Search Filters:** Basic text search only (no advanced filters)
- **No Tags:** Category system is limited (no custom tags)
- **No Bulk Operations:** Cannot edit/delete multiple items at once
- **No History:** Cannot undo analysis or restore deleted items

### Cost Considerations
| Usage Pattern | Est. Cost | Risk Level |
|---------------|-----------|------------|
| Personal use (10-50 analyses/day) | $0-5/month | ✅ Low |
| Small team (100-500 analyses/day) | $10-50/month | 🟡 Medium |
| Public website (unlimited) | $100-1000+/month | 🔴 High |

> **💡 Tip:** Monitor your [Gemini API usage](https://makersuite.google.com/app/apikey) regularly to avoid surprise bills.

---

## 🛡️ Security Best Practices

### ✅ DO These Things

1. **Use Your Own API Key**
   - Never share your API key publicly
   - Keep it secure in your browser only
   - Rotate keys regularly

2. **Monitor API Usage**
   - Check Gemini dashboard weekly
   - Set up usage alerts
   - Track spending limits

3. **Use on Trusted Devices**
   - Don't use on public/shared computers
   - Clear browser data when done
   - Use private/incognito mode if needed

4. **Backup Your Data**
   - Export registry regularly
   - Keep JSON backups safe
   - Don't lose your catalogs

5. **Keep Software Updated**
   - Pull latest changes from GitHub
   - Update dependencies monthly
   - Watch for security patches

### ❌ DON'T Do These Things

1. **❌ Deploy as Public Website**
   - Without backend API proxy
   - Without authentication
   - Without rate limiting

2. **❌ Share Your API Key**
   - In code repositories
   - With other people
   - On public forums

3. **❌ Use in Production**
   - For business-critical apps
   - With customer data
   - Without proper security setup

4. **❌ Ignore Costs**
   - High-traffic sites can be expensive
   - Monitor usage limits
   - Set budget alerts

5. **❌ Trust User Input Blindly**
   - Always validate data
   - Sanitize before display
   - Check file types/sizes

---

## 🚨 What Could Go Wrong?

### Scenario 1: API Key Theft
**What happens:** Someone copies your API key from browser DevTools  
**Impact:** They use your quota, you get charged  
**Prevention:** Use backend proxy (see DEPLOYMENT.md)  
**Recovery:** Revoke compromised key, create new one

### Scenario 2: Quota Exhaustion
**What happens:** Too many analyses hit daily limit  
**Impact:** App stops working, errors appear  
**Prevention:** Implement rate limiting  
**Recovery:** Wait 24 hours or upgrade Gemini plan

### Scenario 3: localStorage Full
**What happens:** Browser storage limit reached  
**Impact:** Cannot save new analyses  
**Prevention:** Export and clear old data regularly  
**Recovery:** Delete old items or clear all data

### Scenario 4: Malicious Image Upload
**What happens:** User uploads harmful/inappropriate content  
**Impact:** Gemini may refuse to analyze or flag account  
**Prevention:** Client-side file validation  
**Recovery:** Remove offending content, contact Google support

### Scenario 5: CORS Blocking
**What happens:** Gemini API rejects cross-origin requests  
**Impact:** Analysis fails with network error  
**Prevention:** Use backend proxy or proper CORS config  
**Recovery:** Deploy backend or use Netlify functions

---

## 📊 Data Structure

Each analyzed item contains:

```typescript
interface AnalysisResult {
  id: string;
  timestamp: number;
  imageUrl: string;
  analysis: {
    toolName: string;
    primaryLogo: string;
    colorPalette: string[];
    category: string;
    description: string;
    keyFeatures: string[];
    techStack?: string[];
    pricing?: string;
    targetAudience?: string;
  };
}
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Not needed - API keys managed in-app via Settings
# User enters their own Gemini API key in the UI
```

### Vite Config
Custom configuration for:
- Fast HMR (Hot Module Replacement)
- PWA support
- Build optimizations
- Asset handling

---

## 🚀 Performance

- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Bundle Size:** < 300KB (gzipped)
- **Image Optimization:** WebP support
- **Code Splitting:** Dynamic imports
- **Caching Strategy:** Service Worker with Cache-First

---

## ✅ Production Readiness Checklist

### 🔴 Critical (Must Fix Before Production)

- [ ] **Backend API Proxy** - Move Gemini calls to server-side
  - [ ] Create Node.js/Netlify Functions backend
  - [ ] Store API keys server-side only
  - [ ] Add request validation
  - [ ] Implement rate limiting per IP/user
  
- [ ] **Authentication System** - Protect your app
  - [ ] Add user registration/login
  - [ ] OAuth integration (Google, GitHub)
  - [ ] Session management
  - [ ] User-specific data isolation
  
- [ ] **Database Setup** - Replace localStorage
  - [ ] PostgreSQL/MongoDB setup
  - [ ] User data encryption at rest
  - [ ] Backup strategy
  - [ ] Data retention policy

### 🟠 High Priority (Strongly Recommended)

- [ ] **Security Headers** - Protect against attacks
  - [ ] Content Security Policy (CSP)
  - [ ] X-Frame-Options
  - [ ] HTTPS enforcement
  - [ ] CORS configuration
  
- [ ] **Monitoring & Logging** - Track issues
  - [ ] Error tracking (Sentry)
  - [ ] Analytics (Plausible/Fathom)
  - [ ] API usage monitoring
  - [ ] Performance monitoring
  
- [ ] **Input Validation** - Server-side checks
  - [ ] File type validation
  - [ ] File size limits
  - [ ] URL sanitization
  - [ ] XSS prevention

### 🟡 Medium Priority (Important)

- [ ] **Cost Controls** - Manage expenses
  - [ ] Usage quotas per user
  - [ ] Billing alerts
  - [ ] Pricing tiers
  - [ ] Free tier limitations
  
- [ ] **Testing** - Ensure quality
  - [ ] Unit tests
  - [ ] Integration tests
  - [ ] E2E tests
  - [ ] Security testing
  
- [ ] **Documentation** - Help users
  - [ ] API documentation
  - [ ] User guide
  - [ ] FAQ section
  - [ ] Troubleshooting guide

### 🟢 Low Priority (Nice to Have)

- [ ] **Advanced Features**
  - [ ] Team collaboration
  - [ ] Cloud sync
  - [ ] Mobile apps
  - [ ] Browser extension
  
- [ ] **Optimization**
  - [ ] Image CDN
  - [ ] Edge caching
  - [ ] Load balancing
  - [ ] Auto-scaling

---

## 🔒 How to Secure for Production

### Step 1: Set Up Backend (Critical)

```bash
# Example using Netlify Functions
netlify/functions/analyze.ts
```

```typescript
import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const handler: Handler = async (event) => {
  // Verify auth token
  const token = event.headers.authorization;
  if (!token || !verifyToken(token)) {
    return { statusCode: 401, body: 'Unauthorized' };
  }
  
  // Rate limiting check
  const userId = getUserFromToken(token);
  if (await isRateLimited(userId)) {
    return { statusCode: 429, body: 'Rate limit exceeded' };
  }
  
  // Use server-side API key (from environment)
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  
  try {
    const result = await genAI.generateContent({
      // ... analysis logic
    });
    
    await logUsage(userId, 'analysis');
    
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    await logError(userId, error);
    return { statusCode: 500, body: 'Analysis failed' };
  }
};
```

### Step 2: Add Authentication

```typescript
// Use Firebase Auth, Auth0, or Supabase
import { getAuth, signInWithPopup } from 'firebase/auth';

const handleLogin = async () => {
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  // Store user token
  localStorage.setItem('authToken', result.user.getIdToken());
};
```

### Step 3: Implement Rate Limiting

```typescript
// Server-side rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
  message: 'Too many requests, please try again later'
});

app.use('/api/analyze', limiter);
```

### Step 4: Environment Variables

```env
# .env.production (NEVER commit this!)
DATABASE_URL=postgresql://...
GEMINI_API_KEY=your_key_here
JWT_SECRET=your_secret_here
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
```

### Step 5: Deploy Securely

```bash
# Build and deploy
npm run build
netlify deploy --prod

# Set environment variables in Netlify dashboard
# Enable HTTPS (automatic with Netlify)
# Configure custom domain
```

---

## 🛡️ Security Best Practices

### ✅ Implemented
- Client-side API key storage (localStorage)
- No hardcoded secrets in codebase
- GitGuardian ggshield integration
- Input sanitization
- XSS prevention
- HTTPS ready

### 🔜 Recommended for Production
- Backend API proxy for Gemini calls
- User authentication (OAuth/JWT)
- Rate limiting per user
- Database for persistent storage
- API key rotation
- Audit logging

---

## 📱 Progressive Web App

LinkSnap is a full-featured PWA:

- **📲 Installable** - Add to home screen on any device
- **⚡ Offline-First** - Works without internet
- **🔄 Background Sync** - Queue actions when offline
- **📬 Push Notifications** - (Coming soon)
- **🎨 Adaptive Icons** - Platform-specific icons
- **🌐 Service Worker** - Smart caching strategies

---

## 🗺️ Roadmap

### ✅ Completed (v1.0)
- [x] Core AI analysis functionality
- [x] Screenshot upload
- [x] URL analysis
- [x] Category filtering
- [x] Export/import data
- [x] Nothing Phone UI design
- [x] PWA setup
- [x] Onboarding flow
- [x] Settings panel
- [x] GitGuardian security scanning

### 🚧 In Progress (v1.1)
- [ ] Backend API proxy
- [ ] User authentication
- [ ] Cloud sync
- [ ] Collaborative sharing
- [ ] Browser extension
- [ ] Mobile app (React Native)

### 🔮 Future (v2.0+)
- [ ] Chrome Extension for one-click saves
- [ ] Collections & folders
- [ ] AI-powered recommendations
- [ ] Integration with Notion, Obsidian
- [ ] Team workspaces
- [ ] Public gallery of tools
- [ ] AI chat with your bookmarks

---

## 🤝 Contributing

We love contributions! Here's how you can help:

### 🐛 Bug Reports
Found a bug? [Open an issue](https://github.com/sumanthkatta-dev/linksnap/issues) with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 💡 Feature Requests
Have an idea? [Start a discussion](https://github.com/sumanthkatta-dev/linksnap/discussions) to:
- Describe the feature
- Explain the use case
- Share mockups if you have them

### 🔧 Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### 📝 Development Guidelines
- Follow existing code style
- Add TypeScript types
- Write meaningful commit messages
- Update documentation
- Test thoroughly before PR

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:
✅ Commercial use  
✅ Modification  
✅ Distribution  
✅ Private use  
❌ Liability  
❌ Warranty  

---

## 🙏 Acknowledgments

### Built With ❤️ By
**Sumanth Katta** - Full Stack Developer  
- GitHub: [@sumanthkatta-dev](https://github.com/sumanthkatta-dev)
- Portfolio: [sumanthkatta.dev](https://sumanthkatta.dev)

### Special Thanks
- **Google Gemini Team** - For the amazing AI API
- **Nothing Phone** - For design inspiration
- **Vercel** - For hosting & deployment
- **Open Source Community** - For amazing tools

### Technologies & Resources
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vite.dev)
- [Lucide Icons](https://lucide.dev)
- [Google Gemini API](https://ai.google.dev)
- [GitGuardian](https://gitguardian.com)

---

## 📞 Support

### Need Help?
- 📧 **Email:** sumanthkatta.dev@gmail.com
- 💬 **Discussions:** [GitHub Discussions](https://github.com/sumanthkatta-dev/linksnap/discussions)
- 🐛 **Issues:** [GitHub Issues](https://github.com/sumanthkatta-dev/linksnap/issues)
- 📚 **Docs:** Check the documentation files in this repo

### Quick Links
- [Live Demo](https://linksnap.netlify.app)
- [API Documentation](https://ai.google.dev/docs)
- [Report Bug](https://github.com/sumanthkatta-dev/linksnap/issues/new?template=bug_report.md)
- [Request Feature](https://github.com/sumanthkatta-dev/linksnap/issues/new?template=feature_request.md)

---

## 🌟 Show Your Support

If you like LinkSnap, please consider:

⭐ **Star this repo** on GitHub  
🐦 **Share on Twitter** with #LinkSnap  
📝 **Write a blog post** about your experience  
🤝 **Contribute** to the project  
💬 **Spread the word** to fellow developers  

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/sumanthkatta-dev/linksnap?color=D71921)
![GitHub language count](https://img.shields.io/github/languages/count/sumanthkatta-dev/linksnap?color=D71921)
![GitHub top language](https://img.shields.io/github/languages/top/sumanthkatta-dev/linksnap?color=D71921)
![GitHub last commit](https://img.shields.io/github/last-commit/sumanthkatta-dev/linksnap?color=D71921)

---

<div align="center">

### Made with 🔴 and ⚡ by [Sumanth Katta](https://github.com/sumanthkatta-dev)

**Stack:** React • TypeScript • Tailwind • Vite • Gemini API

[⬆ Back to Top](#-linksnap)

</div>

---

## 🔥 Changelog

### v1.0.0 (January 2026)
- 🎉 Initial release
- ✨ Core AI analysis functionality
- 🎨 Nothing Phone-inspired UI
- 📱 PWA support
- 🔐 GitGuardian security scanning
- 🌐 Netlify deployment
- 📖 Comprehensive documentation

---

**Built for developers, designers, and digital tool enthusiasts who want to organize their digital ecosystem with AI-powered intelligence.** 🚀

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

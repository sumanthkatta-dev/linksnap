# Privacy Policy

**Last Updated:** March 3, 2026

## Overview

LinkSnap is committed to protecting your privacy. We believe in transparency and giving you complete control over your data.

---

## 🔐 Core Privacy Principles

### No Account Required
- **Zero Registration:** No email, password, or personal information needed
- **No Sign-In:** Access LinkSnap instantly without authentication
- **No Tracking:** We don't track who you are or what you do

### Your Data, Your Device
- **100% Local Storage:** All your bookmarks, preferences, and history are stored on YOUR device only
- **Browser Storage:** Data uses your browser's local storage (IndexedDB/localStorage)
- **Nothing on Our Servers:** We don't store, process, or have access to your data after you upload images

### AI Processing
- **Temporary Processing Only:** When you upload a screenshot:
  - The image is sent to Google's Gemini Vision API for analysis
  - Results are returned to your browser
  - **The image is NOT stored on LinkSnap servers**
- **Google's Privacy:** Image processing is subject to [Google's Privacy Policy](https://policies.google.com/privacy)
- **You Control Your API Key:** You provide your own Gemini API key - we never store it

---

## 📊 What Data We Collect

### What We Don't Collect
- ❌ Personal information (name, email, phone, etc.)
- ❌ IP addresses
- ❌ Device identifiers
- ❌ Browsing history
- ❌ Cookies for tracking
- ❌ Location data
- ❌ Usage analytics

### What You Control
- ✅ Your API key (stored locally and encrypted)
- ✅ Your bookmarks and extracted links
- ✅ Your categories and tags
- ✅ Your export data

---

## 🔑 API Key Security

### How Your API Key is Protected
1. **Local Storage Only:** Your Gemini API key never leaves your device
2. **Encryption:** Keys are obfuscated before local storage
3. **User Managed:** You paste your own key; we can't access it
4. **Runtime Validation:** Checked for validity to prevent errors

### What You Should Do
- 🛡️ **Never Share Your Key:** Keep your API key private
- 🔄 **Rotate Regularly:** Regenerate keys in Google Cloud Console if needed
- 🗑️ **Clear When Done:** Use Settings to remove your key when switching devices

---

## 📱 Data Management

### Export Your Data
- Access all your bookmarks as a JSON file
- Take your data with you anytime
- No restrictions on export

### Delete Your Data
- Clear all data with one click in Settings
- Permanently removes everything from your device
- No recovery possible after deletion

### Browser Privacy
- Clear browser cache/storage to remove LinkSnap data
- Use private/incognito mode for temporary sessions
- Supports PWA offline mode (no internet required after first load)

---

## 🌐 Third-Party Services

### Google Gemini API
- Used for image analysis and link extraction
- Subject to [Google's Privacy Policy](https://policies.google.com/privacy)
- Process is end-to-end: your device → Google → your device
- We don't retain results on our servers

### Vercel (Hosting)
- LinkSnap is hosted on Vercel
- Basic server logs may include request timestamps and URLs
- No personal data is collected or stored

---

## 🔒 Security Measures

### Client-Side Security
- All processing happens in your browser
- No sensitive data transmitted to LinkSnap servers
- HTTPS encryption for all connections
- Content Security Policy (CSP) headers implemented

### API Key Protection
- Never logged or exposed in console
- Validated for proper format
- Removed if invalid to prevent leaks

---

## 📞 Questions About Privacy?

We take privacy seriously. If you have concerns:
- **Email:** [contact@linksnap.dev](mailto:contact@linksnap.dev)
- **GitHub Issues:** [Report on GitHub](https://github.com/sumanthkatta-dev/linksnap)
- **Documentation:** See [SECURITY.md](SECURITY.md) for technical details

---

## Policy Changes

We may update this policy occasionally. Changes will be posted here with an updated "Last Updated" date. Continued use of LinkSnap after changes means you accept the new policy.

---

**Remember:** Your privacy is our priority. LinkSnap is built for you, not to extract value from your data.

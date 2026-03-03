# Support & Troubleshooting

Last Updated: March 3, 2026

## 📚 Getting Help

Welcome to LinkSnap Support! We're here to help you get the most out of our AI-powered link extraction tool.

---

## ❓ Frequently Asked Questions (FAQ)

### Getting Started

**Q: Do I need to create an account?**
A: No! LinkSnap requires zero sign-up. Just visit the site and start uploading screenshots. Your data stays on your device.

**Q: How do I get started?**
A: 
1. Visit [LinkSnap](https://linksnapai.vercel.app)
2. Paste your Gemini API key in Settings
3. Upload a screenshot
4. Boom! Links extracted and categorized automatically

**Q: Is LinkSnap free?**
A: Yes! LinkSnap is completely free. The only cost is the Google Gemini API usage (free tier available with 60 requests/minute).

---

### Features & Usage

**Q: What kind of screenshots can LinkSnap analyze?**
A: LinkSnap works best with screenshots containing:
- URLs and links
- Website interfaces
- Application screenshots
- Design mockups
- Text with URLs

**Q: Can LinkSnap extract links from images with text only?**
A: Yes! LinkSnap can read text in screenshots and extract URLs from it.

**Q: How accurate is the AI?**
A: LinkSnap uses Google's Gemini Vision AI, which is highly accurate. However:
- Always verify extracted URLs before clicking
- Tech stack detection is best-effort
- Categories may need manual adjustment
- Image quality affects accuracy

**Q: Can I edit extracted links?**
A: Yes! You can:
- Edit the URL
- Change the category
- Update the description
- Add or remove tags

**Q: How much data can I store?**
A: Unlimited! Storage depends on your browser's available space (typically 5-50MB).

**Q: Can I use LinkSnap offline?**
A: Partially:
- ✅ View saved links offline
- ✅ Search bookmarks offline
- ❌ Upload new screenshots (requires internet to process)

---

### API & Security

**Q: What's a Gemini API key and how do I get one?**
A: 
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click "Get API key"
3. Create a new API key
4. Copy and paste it in LinkSnap Settings
5. You're done! You'll get 60 free requests/minute

**Q: Is my API key safe?**
A: Yes! 
- Your key is stored ONLY in your browser
- Never sent to LinkSnap servers
- You can regenerate it anytime in Google Cloud Console
- We recommend rotating every 3-6 months

**Q: What if my API key quota is exceeded?**
A: You'll get an error. Solutions:
- Wait for your quota to reset (daily)
- Upgrade to a paid Google Cloud plan for higher limits
- Use a different API key

**Q: Can I use LinkSnap without an API key?**
A: No. You must provide your own Gemini API key for the AI to work.

---

### Data & Storage

**Q: Where is my data stored?**
A: Everywhere you, nowhere else:
- Stored in your browser's local storage
- Not on LinkSnap servers
- Not in the cloud
- Just on your device

**Q: Can I export my bookmarks?**
A: Yes! In Settings:
1. Click "Export Data"
2. A JSON file downloads with all your bookmarks
3. You can import it on another device

**Q: How do I import data from another device?**
A: In Settings:
1. Click "Import Data"
2. Select the JSON export file
3. Your bookmarks load instantly

**Q: What happens if I clear my browser cache?**
A: Your data will be deleted. 
- **Always export first** if you want to keep it
- Use Settings → Export Data before clearing cache

**Q: How long is data kept?**
A: 
- A: Indefinitely on your device
- If you don't access LinkSnap for 1+ year and clear cache, data is lost
- We recommend periodic exports for backup

---

### Troubleshooting

**Q: My screenshot wasn't extracted correctly**
A: Try these fixes:
1. Ensure the image is clear and readable
2. Make sure URLs are visible in the screenshot
3. Check your API key is valid
4. Try a higher quality screenshot
5. Verify your API quota isn't exceeded

**Q: I'm getting an "Invalid API Key" error**
A: 
- Verify the key is correct (copy from Google AI Studio)
- Make sure you're not using extra spaces
- Check if the key has expired
- Try regenerating a new key in Google Cloud Console

**Q: My API key gets reset randomly**
A: 
- This happens if you clear browser cache
- Export your settings first
- Consider using a password manager to save your key
- Or add it to a private note for safe keeping

**Q: LinkSnap is slow/frozen**
A: 
- Check your internet connection
- Verify Gemini API is working (visit Google AI Studio)
- Try a different browser
- Clear browser cache and reload
- Check if you've hit your API quota

**Q: Categories aren't correct**
A: 
- AI can make mistakes! Manually adjust categories
- Use the category filter to find and fix similar entries
- More context in screenshots helps AI categorize better

**Q: I can't upload files larger than my quota**
A: 
- Cloud storage limits exist for free tier
- Switch to a private/incognito window to test
- Check available device storage
- Try smaller image files

**Q: Can't find a link I saved**
A: 
- Use the search bar (searches URLs and descriptions)
- Use category filters to narrow down
- Check if you accidentally deleted it
- Import from your export file if available

---

### Browser & Compatibility

**Q: Which browsers are supported?**
A: LinkSnap works on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ Requires localStorage support

**Q: Is LinkSnap a PWA (Progressive Web App)?**
A: Yes! You can:
- Install LinkSnap on home screen
- Use offline features
- Get notifications (if enabled)

**Q: Can I use LinkSnap on mobile?**
A: Yes! Full mobile support:
- Upload screenshots from camera roll
- Access all features
- Export data mobile-to-mobile

**Q: What if I get a "QuotaExceededError"?**
A: Storage limit reached:
- Export your data first
- Clear old bookmarks
- Look for large images to delete
- Then try again

---

## 🐛 Known Issues & Limitations

### Current Limitations
- Image processing requires internet (for now)
- URLs must be readable in the screenshot
- Tech stack detection is best-effort
- Cannot extract PDFs (screenshots only)
- Category suggestions may need manual refinement

### Temporary Issues
- Sometimes Gemini API has rate limits
- Browser storage may behave differently across incognito/normal modes
- Offline mode doesn't support adding new bookmarks

---

## 💬 Still Need Help?

### Ways to Get Support

1. **GitHub Issues** (Fastest Response)
   - [Report a bug](https://github.com/sumanthkatta-dev/linksnap/issues)
   - [Request a feature](https://github.com/sumanthkatta-dev/linksnap/issues)
   - Includes code for developers

2. **Email Support**
   - [contact@linksnap.dev](mailto:contact@linksnap.dev)
   - Response time: 24-48 hours
   - For general questions and feedback

3. **GitHub Discussions**
   - [Ask questions](https://github.com/sumanthkatta-dev/linksnap/discussions)
   - Community-driven support
   - Share tips and tricks

4. **Documentation**
   - [README.md](README.md) - Product overview
   - [SECURITY.md](SECURITY.md) - Security details
   - [PRIVACY.md](PRIVACY.md) - Privacy & data handling

---

## 🔧 Reporting a Bug

Found an issue? Help us fix it!

**Include:**
- What you were trying to do
- What happened (error message)
- Expected behavior
- Browser / Device info
- Screenshot of the error (if applicable)

**Report on GitHub:** [linksnap/issues](https://github.com/sumanthkatta-dev/linksnap/issues)

---

## 📢 Provide Feedback

We love hearing from you!
- Feature requests: [GitHub Issues](https://github.com/sumanthkatta-dev/linksnap/issues)
- General feedback: [contact@linksnap.dev](mailto:contact@linksnap.dev)
- Follow updates: [GitHub ⭐](https://github.com/sumanthkatta-dev/linksnap)

---

## 🆘 Emergency Contact

For urgent issues:
- **Email:** [contact@linksnap.dev](mailto:contact@linksnap.dev)
- **Mention:** "URGENT:" in subject
- **Response:** Within 24 hours

---

**Remember:** LinkSnap is built for you. We're here to help you succeed!

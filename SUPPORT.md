# LinkSnap Support & Troubleshooting Guide

**Last Updated:** March 3, 2026
**App:** LinkSnap – AI-Powered Link Extractor & Bookmark Manager

---

## Welcome to LinkSnap Support

Whether you're just getting started or running into an issue, this guide covers everything you need to get the most out of LinkSnap — the free, privacy-first AI link extraction and bookmark management tool. No account needed. No fluff. Just answers.

---

## Frequently Asked Questions

### Getting Started

**Do I need to create an account to use LinkSnap?**
No account, no sign-up, no email required. Visit [LinkSnap](https://linksnapai.vercel.app), paste your Gemini API key in Settings, and you're ready to go. Your data stays entirely on your device.

**How do I get started with LinkSnap?**
Getting started takes less than two minutes. Visit the LinkSnap web app, open Settings and paste your Google Gemini API key, upload a screenshot, and LinkSnap will instantly extract and categorize all links from the image.

**Is LinkSnap free to use?**
Yes, LinkSnap is completely free. The only potential cost is your Google Gemini API usage, which includes a generous free tier of 60 requests per minute. Most users will never exceed this.

---

### Features & Usage

**What types of screenshots work best with LinkSnap?**
LinkSnap performs best on screenshots that contain visible URLs, website interfaces, app screens, design mockups, or any image with readable text containing links.

**Can LinkSnap extract links from text-only screenshots?**
Yes. LinkSnap's AI can read text within images and extract any URLs it finds, even in text-heavy screenshots.

**How accurate is the AI link extraction?**
LinkSnap uses Google's Gemini Vision AI, which delivers high accuracy for most screenshots. That said, always verify extracted URLs before clicking them. Tech stack detection and category suggestions are best-effort and may occasionally need manual adjustment. Image clarity directly affects extraction quality.

**Can I edit extracted links after they're saved?**
Yes. You can edit the URL, update the description, change the category, and add or remove tags at any time.

**How much data can I store in LinkSnap?**
There is no hard limit set by LinkSnap. Storage capacity depends on your browser's available local storage, which is typically between 5MB and 50MB.

**Can I use LinkSnap offline?**
Partially. You can view and search your saved bookmarks offline. However, uploading new screenshots for AI processing requires an active internet connection.

**Can I export my saved links?**
Yes! You can export all your saved links and bookmarks as a neatly organized PDF or as a JSON file from the Settings panel — anytime, with no restrictions.

---

### API Key Setup & Security

**What is a Gemini API key and how do I get one?**
A Gemini API key gives LinkSnap permission to use Google's AI to analyze your screenshots. To get one: visit [Google AI Studio](https://aistudio.google.com), click "Get API Key," create a new key, then copy and paste it into LinkSnap's Settings. You'll receive 60 free requests per minute on the free tier.

**Is my Gemini API key safe in LinkSnap?**
Yes. Your API key is stored exclusively in your browser's local storage and is never transmitted to LinkSnap servers. We recommend rotating your key every 3 to 6 months via the Google Cloud Console as a security best practice.

**What happens if I exceed my API quota?**
You'll see an error message. You can wait for your daily quota to reset, upgrade to a paid Google Cloud plan for higher limits, or use a different API key. LinkSnap itself imposes no usage limits.

**Can I use LinkSnap without a Gemini API key?**
No. A Gemini API key is required for the AI-powered link extraction feature to function.

---

### Data & Storage

**Where is my LinkSnap data stored?**
All your data — bookmarks, categories, tags, and preferences — is stored only in your browser's local storage. It is never uploaded to LinkSnap servers, never stored in the cloud, and never shared with third parties.

**How do I export my bookmarks?**
Go to Settings, click "Export Data," and your bookmarks will download as a PDF or JSON file instantly. We recommend doing this periodically as a backup.

**How do I import bookmarks on a new device?**
Go to Settings on your new device, click "Import Data," and select the JSON export file. Your bookmarks will load immediately.

**What happens if I clear my browser cache?**
All LinkSnap data stored in that browser will be permanently deleted. Always export your data before clearing your browser cache or storage.

---

### Troubleshooting

**My screenshot wasn't extracted correctly — what should I do?**
Try the following steps in order: ensure the image is clear and high resolution, confirm that URLs are visible and readable in the screenshot, verify your API key is valid and has not expired, and check that your API quota has not been exceeded.

**I'm seeing an "Invalid API Key" error.**
Copy your API key directly from Google AI Studio and re-paste it into Settings. Make sure there are no extra spaces before or after the key. If the issue persists, generate a fresh key in the Google Cloud Console.

**My API key keeps getting cleared.**
This happens when your browser cache is cleared, as local storage is wiped at the same time. Export your settings before clearing cache, or save your API key in a secure password manager for easy re-entry.

**LinkSnap is running slowly or appears frozen.**
Check your internet connection, verify that the Gemini API is operational via Google AI Studio, try a different browser, or clear your browser cache and reload. Also confirm you have not hit your daily API quota.

**Categories assigned to my links are incorrect.**
AI categorization is a best-effort feature and is not always perfect. You can manually adjust any category by editing the link. Providing clearer, more context-rich screenshots helps the AI categorize links more accurately.

**I cannot find a link I previously saved.**
Use the search bar to search by URL or description. Use category filters to narrow down results. If the link is missing, check whether it was accidentally deleted, and if so, restore it from your most recent export file.

**I'm seeing a "QuotaExceededError" in my browser.**
This means your browser's local storage is full. Export your data first, then delete older or unused bookmarks to free up space, and try again.

---

### Browser & Device Compatibility

**Which browsers does LinkSnap support?**
LinkSnap works on Chrome, Edge, Firefox, and Safari (all latest versions), as well as modern mobile browsers. A browser with localStorage support is required.

**Is LinkSnap available as a Progressive Web App (PWA)?**
Yes. You can install LinkSnap directly to your device's home screen for quick access, use offline features for browsing saved links, and enjoy a native app-like experience — no app store required.

**Can I use LinkSnap on mobile?**
Fully supported. Upload screenshots directly from your camera roll, access all features, and export your data — all from your mobile browser.

---

## Known Limitations

LinkSnap is continuously improving. Current known limitations include:

- AI image processing requires an active internet connection
- URLs must be clearly visible and legible in the screenshot for accurate extraction
- Tech stack detection is best-effort and may not always be accurate
- PDFs cannot be directly analyzed — take a screenshot of the content instead
- Category suggestions may require manual refinement in some cases
- Browser storage behavior may differ between normal and private/incognito modes

---

## Contact Support

**GitHub Issues — Best for Bug Reports & Feature Requests**
Report a bug or request a new feature at [github.com/sumanthkatta-dev/linksnap/issues](https://github.com/sumanthkatta-dev/linksnap/issues). Include a description of what happened, the expected behavior, your browser and device info, and a screenshot of any error if available.

**Email Support — General Questions & Feedback**
Reach us at [linksnap.ai@gmail.com](mailto:linksnap.ai@gmail.com) for general questions, feedback, or non-technical inquiries. Typical response time is 24 to 48 hours. For urgent issues, include "URGENT:" in the subject line.

**GitHub Discussions — Community Help & Tips**
Join the community at [github.com/sumanthkatta-dev/linksnap/discussions](https://github.com/sumanthkatta-dev/linksnap/discussions) to ask questions, share workflows, and discover tips from other LinkSnap users.

---

## Additional Resources

- **README.md** — Full product overview and setup guide
- **SECURITY.md** — Technical security documentation
- **Privacy Policy** — How LinkSnap handles your data
- **Terms of Service** — Usage terms and conditions

---

*LinkSnap is built to make managing links effortless and private. If something isn't working as expected, we want to know. Your feedback makes LinkSnap better for everyone.*
import React from 'react';
import DocumentPage from './DocumentPage';

interface SupportPageProps {
  onClose: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onClose }) => {
  const content = (
    <div className="space-y-6">
      <h1>LinkSnap Support & Troubleshooting Guide</h1>
      <p><strong>Last Updated:</strong> March 3, 2026<br/>
      <strong>App:</strong> LinkSnap – AI-Powered Link Extractor & Bookmark Manager</p>

      <h2>Welcome to LinkSnap Support</h2>
      <p>Whether you're just getting started or running into an issue, this guide covers everything you need to get the most out of LinkSnap — the free, privacy-first AI link extraction and bookmark management tool. No account needed. No fluff. Just answers.</p>

      <h2>Frequently Asked Questions</h2>

      <h3>Getting Started</h3>
      <p><strong>Do I need to create an account to use LinkSnap?</strong><br/>
      No account, no sign-up, no email required. Visit <a href="https://linksnapai.vercel.app">LinkSnap</a>, paste your Gemini API key in Settings, and you're ready to go. Your data stays entirely on your device.</p>

      <p><strong>How do I get started with LinkSnap?</strong><br/>
      Getting started takes less than two minutes. Visit the LinkSnap web app, open Settings and paste your Google Gemini API key, upload a screenshot, and LinkSnap will instantly extract and categorize all links from the image.</p>

      <p><strong>Is LinkSnap free to use?</strong><br/>
      Yes, LinkSnap is completely free. The only potential cost is your Google Gemini API usage, which includes a generous free tier of 60 requests per minute. Most users will never exceed this.</p>

      <h3>Features & Usage</h3>
      <p><strong>What types of screenshots work best with LinkSnap?</strong><br/>
      LinkSnap performs best on screenshots that contain visible URLs, website interfaces, app screens, design mockups, or any image with readable text containing links.</p>

      <p><strong>Can LinkSnap extract links from text-only screenshots?</strong><br/>
      Yes. LinkSnap's AI can read text within images and extract any URLs it finds, even in text-heavy screenshots.</p>

      <p><strong>How accurate is the AI link extraction?</strong><br/>
      LinkSnap uses Google's Gemini Vision AI, which delivers high accuracy for most screenshots. That said, always verify extracted URLs before clicking them. Tech stack detection and category suggestions are best-effort and may occasionally need manual adjustment. Image clarity directly affects extraction quality.</p>

      <p><strong>Can I edit extracted links after they're saved?</strong><br/>
      Yes. You can edit the URL, update the description, change the category, and add or remove tags at any time.</p>

      <p><strong>How much data can I store in LinkSnap?</strong><br/>
      There is no hard limit set by LinkSnap. Storage capacity depends on your browser's available local storage, which is typically between 5MB and 50MB.</p>

      <p><strong>Can I use LinkSnap offline?</strong><br/>
      Partially. You can view and search your saved bookmarks offline. However, uploading new screenshots for AI processing requires an active internet connection.</p>

      <p><strong>Can I export my saved links?</strong><br/>
      Yes! You can export all your saved links and bookmarks as a neatly organized PDF or as a JSON file from the Settings panel — anytime, with no restrictions.</p>

      <h3>API Key Setup & Security</h3>
      <p><strong>What is a Gemini API key and how do I get one?</strong><br/>
      A Gemini API key gives LinkSnap permission to use Google's AI to analyze your screenshots. To get one: visit <a href="https://aistudio.google.com">Google AI Studio</a>, click "Get API Key," create a new key, then copy and paste it into LinkSnap's Settings. You'll receive 60 free requests per minute on the free tier.</p>

      <p><strong>Is my Gemini API key safe in LinkSnap?</strong><br/>
      Yes. Your API key is stored exclusively in your browser's local storage and is never transmitted to LinkSnap servers. We recommend rotating your key every 3 to 6 months via the Google Cloud Console as a security best practice.</p>

      <p><strong>What happens if I exceed my API quota?</strong><br/>
      You'll see an error message. You can wait for your daily quota to reset, upgrade to a paid Google Cloud plan for higher limits, or use a different API key. LinkSnap itself imposes no usage limits.</p>

      <p><strong>Can I use LinkSnap without a Gemini API key?</strong><br/>
      No. A Gemini API key is required for the AI-powered link extraction feature to function.</p>

      <h3>Data & Storage</h3>
      <p><strong>Where is my LinkSnap data stored?</strong><br/>
      All your data — bookmarks, categories, tags, and preferences — is stored only in your browser's local storage. It is never uploaded to LinkSnap servers, never stored in the cloud, and never shared with third parties.</p>

      <p><strong>How do I export my bookmarks?</strong><br/>
      Go to Settings, click "Export Data," and your bookmarks will download as a PDF or JSON file instantly. We recommend doing this periodically as a backup.</p>

      <p><strong>How do I import bookmarks on a new device?</strong><br/>
      Go to Settings on your new device, click "Import Data," and select the JSON export file. Your bookmarks will load immediately.</p>

      <p><strong>What happens if I clear my browser cache?</strong><br/>
      All LinkSnap data stored in that browser will be permanently deleted. Always export your data before clearing your browser cache or storage.</p>

      <h3>Troubleshooting</h3>
      <p><strong>My screenshot wasn't extracted correctly — what should I do?</strong><br/>
      Try the following steps in order: ensure the image is clear and high resolution, confirm that URLs are visible and readable in the screenshot, verify your API key is valid and has not expired, and check that your API quota has not been exceeded.</p>

      <p><strong>I'm seeing an "Invalid API Key" error.</strong><br/>
      Copy your API key directly from Google AI Studio and re-paste it into Settings. Make sure there are no extra spaces before or after the key. If the issue persists, generate a fresh key in the Google Cloud Console.</p>

      <p><strong>My API key keeps getting cleared.</strong><br/>
      This happens when your browser cache is cleared, as local storage is wiped at the same time. Export your settings before clearing cache, or save your API key in a secure password manager for easy re-entry.</p>

      <p><strong>LinkSnap is running slowly or appears frozen.</strong><br/>
      Check your internet connection, verify that the Gemini API is operational via Google AI Studio, try a different browser, or clear your browser cache and reload. Also confirm you have not hit your daily API quota.</p>

      <p><strong>Categories assigned to my links are incorrect.</strong><br/>
      AI categorization is a best-effort feature and is not always perfect. You can manually adjust any category by editing the link. Providing clearer, more context-rich screenshots helps the AI categorize links more accurately.</p>

      <p><strong>I cannot find a link I previously saved.</strong><br/>
      Use the search bar to search by URL or description. Use category filters to narrow down results. If the link is missing, check whether it was accidentally deleted, and if so, restore it from your most recent export file.</p>

      <p><strong>I'm seeing a "QuotaExceededError" in my browser.</strong><br/>
      This means your browser's local storage is full. Export your data first, then delete older or unused bookmarks to free up space, and try again.</p>

      <h3>Browser & Device Compatibility</h3>
      <p><strong>Which browsers does LinkSnap support?</strong><br/>
      LinkSnap works on Chrome, Edge, Firefox, and Safari (all latest versions), as well as modern mobile browsers. A browser with localStorage support is required.</p>

      <p><strong>Is LinkSnap available as a Progressive Web App (PWA)?</strong><br/>
      Yes. You can install LinkSnap directly to your device's home screen for quick access, use offline features for browsing saved links, and enjoy a native app-like experience — no app store required.</p>

      <p><strong>Can I use LinkSnap on mobile?</strong><br/>
      Fully supported. Upload screenshots directly from your camera roll, access all features, and export your data — all from your mobile browser.</p>

      <h2>Known Limitations</h2>
      <p>LinkSnap is continuously improving. Current known limitations include:</p>
      <ul>
        <li>AI image processing requires an active internet connection</li>
        <li>URLs must be clearly visible and legible in the screenshot for accurate extraction</li>
        <li>Tech stack detection is best-effort and may not always be accurate</li>
        <li>PDFs cannot be directly analyzed — take a screenshot of the content instead</li>
        <li>Category suggestions may require manual refinement in some cases</li>
        <li>Browser storage behavior may differ between normal and private/incognito modes</li>
      </ul>

      <h2>Contact Support</h2>
      <p><strong>GitHub Issues — Best for Bug Reports & Feature Requests</strong><br/>
      Report a bug or request a new feature at <a href="https://github.com/sumanthkatta-dev/linksnap/issues">github.com/sumanthkatta-dev/linksnap/issues</a>. Include a description of what happened, the expected behavior, your browser and device info, and a screenshot of any error if available.</p>

      <p><strong>Email Support — General Questions & Feedback</strong><br/>
      Reach us at <a href="mailto:linksnap.ai@gmail.com">linksnap.ai@gmail.com</a> for general questions, feedback, or non-technical inquiries. Typical response time is 24 to 48 hours. For urgent issues, include "URGENT:" in the subject line.</p>

      <p><strong>GitHub Discussions — Community Help & Tips</strong><br/>
      Join the community at <a href="https://github.com/sumanthkatta-dev/linksnap/discussions">github.com/sumanthkatta-dev/linksnap/discussions</a> to ask questions, share workflows, and discover tips from other LinkSnap users.</p>

      <h2>Additional Resources</h2>
      <ul>
        <li><strong>README.md</strong> — Full product overview and setup guide</li>
        <li><strong>SECURITY.md</strong> — Technical security documentation</li>
        <li><strong>Privacy Policy</strong> — How LinkSnap handles your data</li>
        <li><strong>Terms of Service</strong> — Usage terms and conditions</li>
      </ul>

      <p><em>LinkSnap is built to make managing links effortless and private. If something isn't working as expected, we want to know. Your feedback makes LinkSnap better for everyone.</em></p>
    </div>
  );

  return <DocumentPage title="Support & FAQ" content={content} onClose={onClose} />;
};

export default SupportPage;

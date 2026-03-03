import React from 'react';
import DocumentPage from './DocumentPage';

interface SupportPageProps {
  onClose: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onClose }) => {
  const content = (
    <div className="space-y-6">
      <h2>Support & Troubleshooting</h2>
      <p><strong>Last Updated:</strong> March 3, 2026</p>

      <h3>❓ Frequently Asked Questions (FAQ)</h3>

      <h4>Getting Started</h4>
      <p><strong>Q: Do I need to create an account?</strong></p>
      <p>A: No! LinkSnap requires zero sign-up. Just visit the site and start uploading screenshots.</p>

      <p><strong>Q: How do I get started?</strong></p>
      <ol>
        <li>Visit LinkSnap</li>
        <li>Paste your Gemini API key in Settings</li>
        <li>Upload a screenshot</li>
        <li>Links are extracted and categorized automatically</li>
      </ol>

      <p><strong>Q: Is LinkSnap free?</strong></p>
      <p>A: Yes! LinkSnap is completely free. The only cost is the Google Gemini API usage (free tier available).</p>

      <h4>Features & Usage</h4>
      <p><strong>Q: What kind of screenshots can LinkSnap analyze?</strong></p>
      <p>A: Screenshots containing URLs, website interfaces, application screenshots, design mockups, or text with URLs.</p>

      <p><strong>Q: How accurate is the AI?</strong></p>
      <p>A: LinkSnap uses Google's Gemini Vision AI, which is highly accurate. Always verify extracted URLs before clicking.</p>

      <p><strong>Q: How much data can I store?</strong></p>
      <p>A: Unlimited! Storage depends on your browser's available space (typically 5-50MB).</p>

      <p><strong>Q: Can I use LinkSnap offline?</strong></p>
      <ul>
        <li>✅ View saved links offline</li>
        <li>✅ Search bookmarks offline</li>
        <li>❌ Upload new screenshots (requires internet)</li>
      </ul>

      <h4>API & Security</h4>
      <p><strong>Q: What's a Gemini API key and how do I get one?</strong></p>
      <ol>
        <li>Go to Google AI Studio</li>
        <li>Click "Get API key"</li>
        <li>Create a new API key</li>
        <li>Copy and paste it in LinkSnap Settings</li>
      </ol>

      <p><strong>Q: Is my API key safe?</strong></p>
      <p>A: Yes! Your key is stored ONLY in your browser and never sent to LinkSnap servers.</p>

      <p><strong>Q: What if my API key quota is exceeded?</strong></p>
      <p>A: You'll get an error. Wait for your quota to reset (daily) or upgrade to a paid Google Cloud plan.</p>

      <h4>Data & Storage</h4>
      <p><strong>Q: Where is my data stored?</strong></p>
      <p>A: Everywhere you, nowhere else. Data is stored in your browser's local storage, nowhere on our servers.</p>

      <p><strong>Q: Can I export my bookmarks?</strong></p>
      <p>A: Yes! In Settings, click "Export Data" to download a JSON file with all your bookmarks.</p>

      <p><strong>Q: How do I import data from another device?</strong></p>
      <p>A: In Settings, click "Import Data" and select the JSON export file.</p>

      <h3>🐛 Troubleshooting</h3>

      <p><strong>My screenshot wasn't extracted correctly</strong></p>
      <ul>
        <li>Ensure the image is clear and readable</li>
        <li>Make sure URLs are visible in the screenshot</li>
        <li>Check your API key is valid</li>
        <li>Try a higher quality screenshot</li>
      </ul>

      <p><strong>I'm getting an "Invalid API Key" error</strong></p>
      <ul>
        <li>Verify the key is correct</li>
        <li>Make sure you're not using extra spaces</li>
        <li>Check if the key has expired</li>
        <li>Try regenerating a new key in Google Cloud Console</li>
      </ul>

      <p><strong>LinkSnap is slow/frozen</strong></p>
      <ul>
        <li>Check your internet connection</li>
        <li>Verify Gemini API is working</li>
        <li>Try a different browser</li>
        <li>Clear browser cache and reload</li>
      </ul>

      <h3>💬 Need More Help?</h3>
      <ul>
        <li><strong>GitHub Issues:</strong> Report bugs and request features</li>
        <li><strong>Email:</strong> <a href="mailto:contact@linksnap.dev">contact@linksnap.dev</a></li>
        <li><strong>GitHub Discussions:</strong> Ask questions and share tips</li>
      </ul>

      <p><strong>Remember:</strong> LinkSnap is built for you. We're here to help you succeed!</p>
    </div>
  );

  return <DocumentPage title="Support & FAQ" content={content} onClose={onClose} />;
};

export default SupportPage;

import React from 'react';
import DocumentPage from './DocumentPage';

interface TermsPageProps {
  onClose: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onClose }) => {
  const content = (
    <div className="space-y-6">
      <h2>Terms of Service</h2>
      <p><strong>Last Updated:</strong> March 3, 2026</p>

      <h3>1. Agreement to Terms</h3>
      <p>By accessing and using LinkSnap ("the Service"), you agree to be bound by these Terms of Service.</p>

      <h3>2. Use License</h3>
      <p>LinkSnap grants you a limited, non-exclusive, non-transferable license to use this Service for personal, non-commercial purposes.</p>
      
      <h4>You May:</h4>
      <ul>
        <li>✅ Use LinkSnap to extract links from screenshots</li>
        <li>✅ Store and organize bookmarks on your device</li>
        <li>✅ Export your data</li>
        <li>✅ Access all free features</li>
      </ul>

      <h4>You May Not:</h4>
      <ul>
        <li>❌ Use automated bots or scrapers</li>
        <li>❌ Attempt to reverse-engineer or access our servers</li>
        <li>❌ Use LinkSnap to extract links for commercial resale</li>
        <li>❌ Share your API key with others to bypass service limits</li>
      </ul>

      <h3>3. User Responsibilities</h3>
      <ul>
        <li><strong>API Key Management:</strong> You are responsible for keeping your Gemini API key confidential</li>
        <li><strong>Content:</strong> You own all content you upload</li>
        <li><strong>Compliance:</strong> You must comply with Google's Terms of Service for Gemini API usage</li>
      </ul>

      <h3>4. Acceptable Use Policy</h3>
      <p>You agree NOT to use LinkSnap to:</p>
      <ul>
        <li>Upload copyrighted content without authorization</li>
        <li>Extract and redistribute links for commercial purposes</li>
        <li>Harass, defame, or threaten others</li>
        <li>Spread malware or harmful content</li>
        <li>Engage in illegal activities</li>
      </ul>

      <h3>5. No Warranty</h3>
      <p>The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. We do not guarantee uninterrupted service, accuracy of AI-extracted data, or data persistence.</p>

      <h3>6. Limitation of Liability</h3>
      <p>To the fullest extent permitted by law, LinkSnap and its creators are not liable for direct, indirect, incidental, or consequential damages.</p>

      <h3>7. Google Gemini API</h3>
      <ul>
        <li>LinkSnap uses Google's Gemini Vision API for image analysis</li>
        <li>You agree to Google's Terms of Service</li>
        <li>Google may charge for API usage based on your quota</li>
      </ul>

      <h3>8. Disclaimer of AI Accuracy</h3>
      <p><strong>LinkSnap uses AI to extract information from screenshots. AI is not perfect.</strong></p>
      <ul>
        <li>⚠️ Extracted URLs may be incomplete or incorrect</li>
        <li>⚠️ Tech stack detection is best-effort, not guaranteed</li>
        <li>⚠️ Categories may be inaccurate</li>
        <li>⚠️ Always verify extracted data before clicking links</li>
      </ul>

      <h3>Contact Us</h3>
      <p>For questions about these Terms: <a href="mailto:contact@linksnap.dev">contact@linksnap.dev</a></p>

      <p><strong>By using LinkSnap, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong></p>
    </div>
  );

  return <DocumentPage title="Terms of Service" content={content} onClose={onClose} />;
};

export default TermsPage;

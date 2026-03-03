import React from 'react';
import DocumentPage from './DocumentPage';

interface PrivacyPageProps {
  onClose: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ onClose }) => {
  const content = (
    <div className="space-y-6">
      <h2>Privacy Policy</h2>
      <p><strong>Last Updated:</strong> March 3, 2026</p>

      <h3>Overview</h3>
      <p>LinkSnap is committed to protecting your privacy. We believe in transparency and giving you complete control over your data.</p>

      <h3>🔐 Core Privacy Principles</h3>
      <ul>
        <li><strong>No Account Required:</strong> Zero Registration, no email, password, or personal information needed</li>
        <li><strong>No Sign-In:</strong> Access LinkSnap instantly without authentication</li>
        <li><strong>No Tracking:</strong> We don't track who you are or what you do</li>
      </ul>

      <h3>Your Data, Your Device</h3>
      <ul>
        <li><strong>100% Local Storage:</strong> All your bookmarks, preferences, and history are stored on YOUR device only</li>
        <li><strong>Browser Storage:</strong> Data uses your browser's local storage (IndexedDB/localStorage)</li>
        <li><strong>Nothing on Our Servers:</strong> We don't store, process, or have access to your data after you upload images</li>
      </ul>

      <h3>AI Processing</h3>
      <ul>
        <li><strong>Temporary Processing Only:</strong> When you upload a screenshot, the image is sent to Google's Gemini Vision API for analysis</li>
        <li><strong>No Storage:</strong> The image is NOT stored on LinkSnap servers</li>
        <li><strong>You Control Your API Key:</strong> You provide your own Gemini API key - we never store it</li>
      </ul>

      <h3>📊 What Data We Collect</h3>
      <h4>What We Don't Collect</h4>
      <ul>
        <li>❌ Personal information (name, email, phone, etc.)</li>
        <li>❌ IP addresses</li>
        <li>❌ Device identifiers</li>
        <li>❌ Browsing history</li>
        <li>❌ Cookies for tracking</li>
        <li>❌ Location data</li>
        <li>❌ Usage analytics</li>
      </ul>

      <h3>🔑 API Key Security</h3>
      <p>Your Gemini API key is protected by:</p>
      <ul>
        <li><strong>Local Storage Only:</strong> Your key never leaves your device</li>
        <li><strong>Encryption:</strong> Keys are obfuscated before local storage</li>
        <li><strong>User Managed:</strong> You paste your own key; we can't access it</li>
      </ul>

      <h3>📱 Data Management</h3>
      <ul>
        <li><strong>Export Your Data:</strong> Access all your bookmarks as a JSON file anytime</li>
        <li><strong>Delete Your Data:</strong> Clear all data with one click in Settings</li>
        <li><strong>Browser Privacy:</strong> Clear browser cache/storage to remove LinkSnap data</li>
      </ul>

      <h3>Questions About Privacy?</h3>
      <p>Email: <a href="mailto:contact@linksnap.dev">contact@linksnap.dev</a></p>

      <p><strong>Remember:</strong> Your privacy is our priority. LinkSnap is built for you, not to extract value from your data.</p>
    </div>
  );

  return <DocumentPage title="Privacy Policy" content={content} onClose={onClose} />;
};

export default PrivacyPage;

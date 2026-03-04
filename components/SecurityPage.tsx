import React from 'react';
import DocumentPage from './DocumentPage';

interface SecurityPageProps {
  onClose: () => void;
}

const SecurityPage: React.FC<SecurityPageProps> = ({ onClose }) => {
  const content = (
    <div className="space-y-6">
      <h1>LinkSnap Security & Data Protection</h1>
      <p><strong>Last Updated:</strong> March 4, 2026<br/>
      <strong>App:</strong> LinkSnap – AI-Powered Link & Bookmark Manager</p>

      <h2>Security at a Glance</h2>
      <p>LinkSnap is built with security and privacy as core principles. This page outlines how we protect your data, secure your API credentials, and maintain the integrity of the application.</p>

      <h2>1. No Server-Side Data Storage</h2>
      <p>LinkSnap operates on a <strong>zero-server-storage</strong> model:</p>
      <ul>
        <li>All your bookmarks, links, and preferences are stored <strong>locally in your browser</strong></li>
        <li>LinkSnap servers never receive, store, or process your saved data</li>
        <li>Your data remains entirely under your control at all times</li>
        <li>No database, no cloud backup, no third-party access</li>
      </ul>
      <p>This architecture choice eliminates entire classes of security risks including data breaches, unauthorized access, and server compromises.</p>

      <h2>2. API Key Security</h2>
      <p>When you provide your Google Gemini API key to enable AI-powered link extraction, LinkSnap handles it with care:</p>

      <h3>How Your API Key is Protected</h3>
      <ul>
        <li><strong>Local Storage Only:</strong> Your API key is stored in your browser's secure local storage, never transmitted to LinkSnap servers</li>
        <li><strong>Direct Communication:</strong> API requests go directly from your browser to Google's servers via HTTPS</li>
        <li><strong>No Intermediary Storage:</strong> LinkSnap never logs, stores, or caches your API key on any server</li>
        <li><strong>User-Controlled:</strong> You can delete or change your API key anytime from Settings</li>
      </ul>

      <h3>Best Practices for API Key Management</h3>
      <ul>
        <li>Never share your API key with anyone</li>
        <li>Revoke and regenerate your key if you suspect it has been compromised</li>
        <li>Monitor your Google Cloud Console for unexpected API usage</li>
        <li>Use API quotas and rate limits in your Google Cloud settings</li>
      </ul>

      <h2>3. HTTPS & Secure Connections</h2>
      <p>LinkSnap enforces secure communication:</p>
      <ul>
        <li>All web traffic is encrypted using <strong>TLS 1.3</strong></li>
        <li>API calls to Google Gemini use HTTPS exclusively</li>
        <li>No mixed content or insecure resource loading</li>
        <li>Content Security Policy (CSP) headers prevent XSS attacks</li>
      </ul>

      <h2>4. Data Export & Backup</h2>
      <p>You maintain full ownership of your data:</p>
      <ul>
        <li><strong>Export Anytime:</strong> Export all your bookmarks as PDF or JSON from Settings</li>
        <li><strong>Portable Format:</strong> JSON exports can be imported into other tools or backed up securely</li>
        <li><strong>No Lock-In:</strong> Your data is yours to move, backup, or delete at any time</li>
      </ul>

      <h2>5. Browser Security Features</h2>
      <p>LinkSnap leverages modern browser security capabilities:</p>
      <ul>
        <li><strong>Same-Origin Policy:</strong> Prevents unauthorized cross-origin access</li>
        <li><strong>Secure Context:</strong> Service Workers and localStorage only function over HTTPS</li>
        <li><strong>Sandboxed Execution:</strong> JavaScript runs in a secure browser sandbox</li>
        <li><strong>No Eval or Unsafe Scripts:</strong> Code follows strict Content Security Policy rules</li>
      </ul>

      <h2>6. Third-Party Services</h2>
      <p>LinkSnap minimizes third-party dependencies, but uses these trusted services:</p>

      <h3>Google Gemini Vision API</h3>
      <ul>
        <li><strong>Purpose:</strong> AI-powered link extraction from screenshots</li>
        <li><strong>Data Sent:</strong> Only the screenshot image you explicitly upload</li>
        <li><strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy">Google Privacy Policy</a></li>
        <li><strong>Your Control:</strong> You control when images are sent by choosing when to upload</li>
      </ul>

      <h3>Vercel (Hosting)</h3>
      <ul>
        <li><strong>Purpose:</strong> Secure, fast hosting with global CDN</li>
        <li><strong>Data Sent:</strong> Standard web request metadata (IP, user agent) for performance optimization</li>
        <li><strong>Privacy Policy:</strong> <a href="https://vercel.com/legal/privacy-policy">Vercel Privacy Policy</a></li>
      </ul>

      <h2>7. Vulnerability Reporting</h2>
      <p>Security researchers and users who discover vulnerabilities are encouraged to report them responsibly:</p>

      <h3>How to Report a Security Issue</h3>
      <ul>
        <li>Email: <a href="mailto:linksnap.ai@gmail.com?subject=[SECURITY]">linksnap.ai@gmail.com</a> with subject line <code>[SECURITY]</code></li>
        <li>GitHub Security Advisories: <a href="https://github.com/sumanthkatta-dev/linksnap/security/advisories/new">Report privately</a></li>
        <li>Include a clear description of the vulnerability and steps to reproduce</li>
        <li>Allow 48–72 hours for an initial response</li>
      </ul>

      <h3>Our Commitment</h3>
      <ul>
        <li>We will acknowledge your report within 48 hours</li>
        <li>We will work to verify and address valid issues promptly</li>
        <li>We will credit researchers who report responsibly (unless they prefer anonymity)</li>
        <li>We will notify users if a critical vulnerability affects existing deployments</li>
      </ul>

      <h2>8. Open Source Transparency</h2>
      <p>LinkSnap is <strong>fully open source</strong> on GitHub:</p>
      <ul>
        <li>All code is publicly auditable at <a href="https://github.com/sumanthkatta-dev/linksnap">github.com/sumanthkatta-dev/linksnap</a></li>
        <li>Security-conscious users can review the codebase before use</li>
        <li>Community contributions improve security through peer review</li>
        <li>No hidden backdoors or obscured functionality</li>
      </ul>

      <h2>9. Regular Security Updates</h2>
      <p>We actively maintain LinkSnap's security:</p>
      <ul>
        <li>Dependencies are regularly updated to patch known vulnerabilities</li>
        <li>Security patches are released promptly when issues are discovered</li>
        <li>Critical updates are announced via GitHub releases and notifications</li>
        <li>Users are encouraged to use the latest version</li>
      </ul>

      <h2>10. User Responsibilities</h2>
      <p>While LinkSnap provides strong security foundations, users play a critical role:</p>
      <ul>
        <li><strong>Keep Your Browser Updated:</strong> Use the latest version of Chrome, Firefox, Safari, or Edge</li>
        <li><strong>Secure Your Device:</strong> Use device passwords, encryption, and antivirus software</li>
        <li><strong>Be Cautious With Links:</strong> Verify extracted URLs before clicking, especially from untrusted sources</li>
        <li><strong>Backup Your Data:</strong> Export your bookmarks regularly if they are important</li>
        <li><strong>Monitor API Usage:</strong> Check your Google Cloud Console for unexpected activity</li>
      </ul>

      <h2>Questions About Security?</h2>
      <p>If you have questions, concerns, or suggestions about LinkSnap's security practices, we're here to help:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:linksnap.ai@gmail.com">linksnap.ai@gmail.com</a></li>
        <li><strong>GitHub Discussions:</strong> <a href="https://github.com/sumanthkatta-dev/linksnap/discussions">Community forum</a></li>
        <li><strong>GitHub Issues:</strong> <a href="https://github.com/sumanthkatta-dev/linksnap/issues">Report security concerns</a></li>
      </ul>

      <blockquote>
        <strong>Our Pledge:</strong> LinkSnap will never compromise user privacy or security for convenience, monetization, or third-party demands. Your data is yours — always.
      </blockquote>
    </div>
  );

  return <DocumentPage title="Security & Data Protection" content={content} onClose={onClose} />;
};

export default SecurityPage;

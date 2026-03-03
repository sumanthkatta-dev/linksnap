import React from 'react';
import DocumentPage from './DocumentPage';

interface TermsPageProps {
  onClose: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onClose }) => {
  const content = (
    <div className="space-y-6">
      <h1>LinkSnap Terms of Service – Simple, Fair & Transparent</h1>
      <p><strong>Last Updated:</strong> March 3, 2026<br/>
      <strong>Effective Date:</strong> March 3, 2026<br/>
      <strong>App:</strong> LinkSnap – AI-Powered Link Extractor & Bookmark Manager</p>

      <h2>Terms at a Glance</h2>
      <p>LinkSnap is a free, privacy-first tool that lets you extract, organize, and export links from screenshots using AI. These Terms of Service govern your use of the LinkSnap web app and Progressive Web App (PWA). By using LinkSnap, you agree to these terms. If you do not agree, please discontinue use of the Service.</p>

      <h2>1. Who Can Use LinkSnap</h2>
      <p>LinkSnap is available to anyone, anywhere — no account, no registration, and no sign-in required. By accessing the Service, you confirm that you are using it lawfully and in accordance with these Terms.</p>

      <h2>2. License to Use LinkSnap</h2>
      <p>LinkSnap grants you a limited, non-exclusive, non-transferable license to use this Service for <strong>personal, non-commercial purposes</strong>. This license is subject to the restrictions outlined below.</p>

      <h3>What You Can Do</h3>
      <ul>
        <li>Use LinkSnap to extract links and URLs from screenshots using AI</li>
        <li>Save, organize, and categorize bookmarks locally on your device</li>
        <li>Export your saved links and bookmarks as a neatly organized PDF or JSON file</li>
        <li>Access all free features of the LinkSnap web app and PWA</li>
        <li>Fork and modify the open-source code for personal use (subject to the LICENSE file)</li>
      </ul>

      <h3>What You Cannot Do</h3>
      <ul>
        <li>Use automated bots, scrapers, or scripts against LinkSnap infrastructure</li>
        <li>Attempt to reverse-engineer, decompile, or gain unauthorized access to LinkSnap servers</li>
        <li>Extract and resell links or data for commercial purposes</li>
        <li>Share your Gemini API key with others to bypass service limitations</li>
        <li>Access LinkSnap through any unauthorized interface or method</li>
        <li>Interfere with or disrupt the operation of the Service</li>
      </ul>

      <h2>3. Your Responsibilities as a User</h2>

      <h3>API Key Management</h3>
      <p>To use AI-powered link extraction, you supply your own Google Gemini API key. You are solely responsible for:</p>
      <ul>
        <li>Keeping your API key confidential and secure</li>
        <li>All activities and API usage conducted under your key</li>
        <li>Complying with <a href="https://policies.google.com/terms">Google's Terms of Service</a> for the Gemini API</li>
        <li>Any charges or rate limits Google may apply based on your usage</li>
      </ul>
      <p>LinkSnap never stores, accesses, or transmits your API key to our servers.</p>

      <h3>Your Uploaded Content</h3>
      <ul>
        <li>You retain full ownership of all screenshots and data you upload</li>
        <li>You are responsible for ensuring you have the right to use any content you upload</li>
        <li>Do not upload content that infringes on third-party copyrights or intellectual property rights</li>
      </ul>

      <h2>4. Acceptable Use Policy</h2>
      <p>LinkSnap is built to help you work smarter — not to be misused. You agree not to use LinkSnap to:</p>
      <ul>
        <li>Upload or process copyrighted content without proper authorization</li>
        <li>Extract, compile, or redistribute links for unlawful or commercial resale</li>
        <li>Spread malware, harmful scripts, or malicious content</li>
        <li>Harass, defame, threaten, or harm any individual or group</li>
        <li>Engage in any activity that violates applicable local, national, or international law</li>
        <li>Circumvent security measures, rate limits, or service restrictions</li>
        <li>Interfere with or damage LinkSnap's infrastructure or other users' experience</li>
      </ul>
      <p>Violations of this policy may result in loss of access to the Service and, where applicable, legal action.</p>

      <h2>5. Intellectual Property</h2>

      <h3>LinkSnap's Property</h3>
      <p>LinkSnap's source code is open-source (see the LICENSE file in the repository). However, LinkSnap's UI/UX design, branding, logo, and visual identity are proprietary and may not be reproduced or used without explicit permission.</p>

      <h3>Your Property</h3>
      <p>You retain all rights to your uploaded content and extracted data. LinkSnap does not claim ownership over anything you create, upload, or export using the Service.</p>

      <h2>6. AI-Powered Link Extraction – Accuracy Disclaimer</h2>
      <p>LinkSnap uses Google's Gemini Vision API to extract links and data from screenshots. While we strive for the best possible results, AI extraction is not perfect. Please be aware:</p>
      <ul>
        <li>Extracted URLs may occasionally be incomplete, incorrect, or missing</li>
        <li>Tech stack detection and link categorization are best-effort estimates, not guaranteed results</li>
        <li>AI-generated categories may not always reflect accurate classification</li>
      </ul>
      <p><strong>You are responsible for reviewing and verifying all extracted links and data before use.</strong> LinkSnap is not liable for any decisions made based on AI-extracted information.</p>

      <h2>7. Third-Party Services</h2>
      <p>LinkSnap integrates with the following third-party services to deliver its core functionality:</p>

      <p><strong>Google Gemini API</strong> — Powers AI-based image analysis and link extraction. Subject to <a href="https://policies.google.com/terms">Google's Terms of Service</a> and <a href="https://policies.google.com/privacy">Google's Privacy Policy</a>. LinkSnap is not responsible for Google API outages, rate limits, policy changes, or any charges incurred through your API usage.</p>

      <p><strong>Vercel</strong> — Provides hosting and content delivery infrastructure for LinkSnap. Subject to <a href="https://vercel.com/legal/terms">Vercel's Terms of Service</a>. LinkSnap is not responsible for hosting-related disruptions.</p>

      <h2>8. No Warranty</h2>
      <p>LinkSnap is provided <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> without warranties of any kind, express or implied. We do not warrant or guarantee:</p>
      <ul>
        <li>Uninterrupted or error-free availability of the Service</li>
        <li>Accuracy or completeness of AI-extracted data</li>
        <li>Compatibility with all browsers, operating systems, or devices</li>
        <li>Persistence or recoverability of locally stored data</li>
      </ul>
      <p>Use of LinkSnap is entirely at your own risk.</p>

      <h2>9. Limitation of Liability</h2>
      <p>To the maximum extent permitted by applicable law, LinkSnap and its creators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service. This includes, but is not limited to:</p>
      <ul>
        <li>Data loss or corruption</li>
        <li>Business interruption or lost productivity</li>
        <li>Errors in AI-extracted content</li>
        <li>Third-party service failures (e.g., Google Gemini API outages)</li>
        <li>Security breaches or unauthorized access to your device</li>
      </ul>
      <p>Since LinkSnap is offered free of charge, our total aggregate liability to you shall not exceed zero dollars ($0.00).</p>

      <h2>10. Service Modifications & Discontinuation</h2>
      <p>We reserve the right to modify, suspend, or discontinue any part of LinkSnap at any time, with or without prior notice. This includes adding, changing, or removing features. LinkSnap is not liable for any consequences resulting from service changes or discontinuation.</p>
      <p>We recommend regularly exporting your data as a PDF or JSON file to avoid any potential data loss.</p>

      <h2>12. Data Storage & Deletion</h2>
      <p>All your data is stored locally in your browser. LinkSnap does not maintain copies of your data on any server. Key points:</p>
      <ul>
        <li>You can export your data at any time as a PDF or JSON file</li>
        <li>You can permanently delete all your data from the Settings panel</li>
        <li>Local data deletion is irreversible — we cannot recover it because we never held it</li>
        <li>Clearing your browser storage or cache will also remove all LinkSnap data</li>
      </ul>

      <h2>13. Privacy</h2>
      <p>Your use of LinkSnap is also governed by our Privacy Policy. We encourage you to read it in full. By using LinkSnap, you consent to the data practices described therein.</p>

      <h2>14. Termination of Access</h2>
      <p>We reserve the right to restrict or terminate your access to LinkSnap if you:</p>
      <ul>
        <li>Violate any provision of these Terms of Service</li>
        <li>Engage in prohibited or unlawful activity</li>
        <li>Repeatedly misuse or abuse the Service</li>
        <li>Intentionally interfere with the Service's infrastructure or operation</li>
      </ul>

      <h2>15. Governing Law</h2>
      <p>These Terms of Service are governed by the laws of the jurisdiction in which LinkSnap is operated, without regard to conflict of law principles. You agree to submit to the exclusive jurisdiction of the applicable courts for resolution of any disputes not resolved through the process below.</p>

      <h2>16. Dispute Resolution</h2>

      <h3>Step 1 – Informal Resolution</h3>
      <p>If you have a dispute or concern regarding these Terms or the Service, please contact us first at <a href="mailto:linksnap.ai@gmail.com">linksnap.ai@gmail.com</a>. We will make a good-faith effort to resolve the issue within a reasonable timeframe.</p>

      <h3>Step 2 – Arbitration</h3>
      <p>If informal resolution is not successful, any unresolved legal dispute shall be settled through binding arbitration rather than through court proceedings, to the extent permitted by applicable law.</p>

      <h2>17. Severability</h2>
      <p>If any provision of these Terms is found to be invalid, unlawful, or unenforceable by a court of competent jurisdiction, that provision will be modified to the minimum extent necessary or severed entirely. All remaining provisions will continue in full force and effect.</p>

      <h2>18. Changes to These Terms</h2>
      <p>We may update these Terms of Service periodically to reflect changes in the Service or applicable law. When changes are made, the "Last Updated" date at the top of this page will be revised. Your continued use of LinkSnap following any updates constitutes your acceptance of the revised Terms. We encourage you to review this page from time to time.</p>

      <h2>19. Contact Us</h2>
      <p>For questions, concerns, or feedback about these Terms of Service:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:linksnap.ai@gmail.com">linksnap.ai@gmail.com</a></li>
        <li><strong>GitHub:</strong> <a href="https://github.com/sumanthkatta-dev/linksnap">github.com/sumanthkatta-dev/linksnap</a></li>
      </ul>

      <p><em>By using LinkSnap, you confirm that you have read, understood, and agree to be bound by these Terms of Service. Thank you for trusting LinkSnap to manage your links — privately, efficiently, and without compromise.</em></p>

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

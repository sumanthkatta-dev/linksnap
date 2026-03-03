import React from 'react';
import DocumentPage from './DocumentPage';

interface ContactPageProps {
  onClose: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onClose }) => {
  const content = (
    <div className="space-y-6">
      <h2>Contact Developer</h2>
      <p><strong>Last Updated:</strong> March 3, 2026</p>

      <h3>📬 Get in Touch</h3>
      <p>We'd love to hear from you! Whether you have questions, feedback, feature requests, or just want to say hi, here's how to reach us.</p>

      <h3>📧 Email Support</h3>
      <p><strong>Primary Contact:</strong> <a href="mailto:contact@linksnap.dev">contact@linksnap.dev</a></p>
      <ul>
        <li><strong>Response Time:</strong> 24-48 hours</li>
        <li><strong>Best For:</strong> General inquiries, feedback, feature requests, business inquiries</li>
      </ul>

      <p><strong>Subject line tips for faster responses:</strong></p>
      <ul>
        <li>[BUG] Issue title here</li>
        <li>[FEATURE] Feature request here</li>
        <li>[SUPPORT] Help needed here</li>
        <li>[URGENT] Time-sensitive issue</li>
      </ul>

      <h3>🐙 GitHub</h3>
      <p><strong>Repository:</strong> <a href="https://github.com/sumanthkatta-dev/linksnap" target="_blank" rel="noopener noreferrer">sumanthkatta-dev/linksnap</a></p>

      <h4>Issues</h4>
      <ul>
        <li><strong>Best For:</strong> Technical issues, bug reports, feature requests</li>
        <li><strong>Response Time:</strong> 48-72 hours</li>
      </ul>

      <h4>Discussions</h4>
      <ul>
        <li><strong>Best For:</strong> Questions, tips, ideas, general discussion</li>
        <li><strong>Community-driven support</strong></li>
      </ul>

      <h3>🔒 Security Issues</h3>
      <p><strong>IMPORTANT:</strong> Do not post security vulnerabilities publicly.</p>

      <p><strong>Report Security Issues</strong></p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:contact@linksnap.dev">contact@linksnap.dev</a></li>
        <li><strong>Subject:</strong> [SECURITY] Vulnerability Report</li>
        <li><strong>Response Time:</strong> Within 24 hours</li>
      </ul>

      <h3>💼 Business Inquiries</h3>

      <h4>Partnerships</h4>
      <p>Interested in partnering with LinkSnap?</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:contact@linksnap.dev">contact@linksnap.dev</a></li>
        <li><strong>Subject:</strong> [PARTNERSHIP] Your proposal</li>
      </ul>

      <h4>Sponsorship</h4>
      <p>Want to sponsor LinkSnap development?</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:contact@linksnap.dev">contact@linksnap.dev</a></li>
        <li><strong>Subject:</strong> [SPONSORSHIP] Your name</li>
      </ul>

      <h3>👨‍💻 For Developers</h3>

      <h4>Contributing</h4>
      <p>Want to contribute to LinkSnap?</p>
      <ul>
        <li><strong>Repository:</strong> <a href="https://github.com/sumanthkatta-dev/linksnap" target="_blank" rel="noopener noreferrer">GitHub - LinkSnap</a></li>
        <li>Fork → Branch → Code → Test → Pull Request</li>
      </ul>

      <h4>Development Questions</h4>
      <ul>
        <li><strong>GitHub Discussions:</strong> Dev Questions</li>
        <li><strong>Email:</strong> <a href="mailto:contact@linksnap.dev">contact@linksnap.dev</a></li>
      </ul>

      <h3>📱 Social & Community</h3>
      <p><strong>GitHub:</strong> <a href="https://github.com/sumanthkatta-dev" target="_blank" rel="noopener noreferrer">@sumanthkatta-dev</a></p>
      <p>Share your feedback using #LinkSnapAI</p>

      <h3>⏰ Response Times</h3>
      <ul>
        <li><strong>Email (General):</strong> 24-48 hours</li>
        <li><strong>Email (Security):</strong> 24 hours</li>
        <li><strong>GitHub Issues (Bug):</strong> 48-72 hours</li>
        <li><strong>GitHub Issues (Feature):</strong> 1 week</li>
        <li><strong>GitHub PR:</strong> 48-96 hours</li>
      </ul>

      <h3>Resources</h3>
      <ul>
        <li><a href="https://github.com/sumanthkatta-dev/linksnap">GitHub Repository</a></li>
        <li><a href="https://github.com/sumanthkatta-dev/linksnap/issues">Report Issues</a></li>
        <li><a href="https://github.com/sumanthkatta-dev/linksnap/discussions">Community Discussions</a></li>
      </ul>

      <p><strong>Thank you for using LinkSnap and helping us make it better!</strong></p>
    </div>
  );

  return <DocumentPage title="Contact Developer" content={content} onClose={onClose} />;
};

export default ContactPage;

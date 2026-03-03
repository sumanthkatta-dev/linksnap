import React from 'react';
import DocumentPage from './DocumentPage';

interface ContactPageProps {
  onClose: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onClose }) => {
  const content = (
    <div className="space-y-6">
      <h1>Contact the LinkSnap Developer – We'd Love to Hear From You</h1>
      <p><strong>Last Updated:</strong> March 3, 2026<br/>
      <strong>App:</strong> LinkSnap – AI-Powered Link Extractor & Bookmark Manager</p>

      <h2>Get in Touch</h2>
      <p>Have a question, a bug to report, a feature idea, or a business proposal? We're always happy to hear from the LinkSnap community. Choose the channel below that best fits your needs and we'll get back to you as soon as possible.</p>

      <h2>Email Support</h2>
      <p><strong>Email:</strong> <a href="mailto:linksnap.ai@gmail.com">linksnap.ai@gmail.com</a><br/>
      <strong>Response Time:</strong> 24–48 hours</p>

      <p>Email is the best way to reach us for general questions, feedback, partnership proposals, and security concerns. To help us respond faster, use one of the following subject line formats:</p>
      <ul>
        <li><code>[BUG]</code> — for bug reports</li>
        <li><code>[FEATURE]</code> — for feature requests</li>
        <li><code>[SUPPORT]</code> — for help and troubleshooting</li>
        <li><code>[SECURITY]</code> — for vulnerability disclosures</li>
        <li><code>[URGENT]</code> — for time-sensitive issues</li>
      </ul>

      <h2>GitHub – Bug Reports, Features & Community</h2>
      <p><strong>Repository:</strong> <a href="https://github.com/sumanthkatta-dev/linksnap">github.com/sumanthkatta-dev/linksnap</a></p>

      <p>GitHub is the fastest and most effective way to report bugs and request new features. Browse open issues, track progress, and contribute directly to the codebase.</p>

      <p><strong>GitHub Issues</strong> — <a href="https://github.com/sumanthkatta-dev/linksnap/issues">Submit a bug or feature request</a><br/>
      Use this for technical bug reports, reproducible errors, and feature suggestions. Response time is typically 48–72 hours.</p>

      <p><strong>GitHub Discussions</strong> — <a href="https://github.com/sumanthkatta-dev/linksnap/discussions">Join the community</a><br/>
      A great place to ask general questions, share tips, discuss ideas, and connect with other LinkSnap users. Community-driven and open to all.</p>

      <p>If LinkSnap has been useful to you, starring the repository on GitHub is a great way to show your support and help others discover the project.</p>

      <h2>Reporting a Bug</h2>
      <p>To help us fix issues quickly, please include the following when reporting a bug:</p>
      <ul>
        <li>A clear description of what you were trying to do</li>
        <li>The exact error message or unexpected behavior</li>
        <li>Your browser name and version, and your device type (desktop/mobile)</li>
        <li>Steps to reproduce the issue</li>
        <li>A screenshot of the error, if available</li>
      </ul>
      <p>Submit bug reports via <a href="https://github.com/sumanthkatta-dev/linksnap/issues">GitHub Issues</a> or email <a href="mailto:linksnap.ai@gmail.com">linksnap.ai@gmail.com</a>.</p>

      <h2>Reporting a Security Vulnerability</h2>
      <p><strong>Please do not post security vulnerabilities publicly.</strong> Responsible disclosure helps protect all LinkSnap users.</p>

      <p>To report a security issue, email <a href="mailto:linksnap.ai@gmail.com">linksnap.ai@gmail.com</a> with the subject line <code>[SECURITY] Vulnerability Report</code>. Please include a description of the vulnerability, steps to reproduce it, and its potential impact.</p>

      <p>When you report a security vulnerability to us, we will acknowledge your report within 24 hours, investigate it promptly, collaborate with you on a fix, keep the issue confidential until it is patched, and credit you in the release notes if you'd like.</p>

      <h2>Business Inquiries</h2>
      <p>Interested in partnering with, sponsoring, or building on top of LinkSnap? We're open to conversations.</p>

      <p><strong>Partnerships</strong> — Email <a href="mailto:linksnap.ai@gmail.com">linksnap.ai@gmail.com</a> with the subject <code>[PARTNERSHIP]</code> and include your company name, vision, and proposal details.</p>

      <p><strong>Sponsorship</strong> — Want to support LinkSnap's ongoing development? Email us with the subject <code>[SPONSORSHIP]</code> and we'll discuss options.</p>

      <p><strong>Custom / White-Label Development</strong> — Need a tailored version of LinkSnap for your product or team? Reach out with the subject <code>[CUSTOM]</code> and a brief description of your project.</p>

      <h2>For Developers & Contributors</h2>
      <p>LinkSnap is open source and we welcome contributions from the community.</p>

      <p>To contribute, fork the repository, create a feature branch, make your changes, and submit a pull request with a clear description of what you've changed. Please reference any related issues and include test cases where applicable. See <code>CONTRIBUTING.md</code> in the repository for full guidelines.</p>

      <p>For development questions, use <a href="https://github.com/sumanthkatta-dev/linksnap/discussions">GitHub Discussions</a> or email <a href="mailto:linksnap.ai@gmail.com">linksnap.ai@gmail.com</a> with your code snippets and technical context included.</p>

      <h2>Response Times at a Glance</h2>
      <table>
        <thead>
          <tr>
            <th>Channel</th>
            <th>Purpose</th>
            <th>Expected Response</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Email</td>
            <td>General inquiries & feedback</td>
            <td>24–48 hours</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>Security vulnerabilities</td>
            <td>Within 24 hours</td>
          </tr>
          <tr>
            <td>GitHub Issues</td>
            <td>Bug reports</td>
            <td>48–72 hours</td>
          </tr>
          <tr>
            <td>GitHub Issues</td>
            <td>Feature requests</td>
            <td>Within 1 week</td>
          </tr>
          <tr>
            <td>GitHub Discussions</td>
            <td>Community questions</td>
            <td>Community-driven</td>
          </tr>
          <tr>
            <td>GitHub Pull Requests</td>
            <td>Code review</td>
            <td>48–96 hours</td>
          </tr>
        </tbody>
      </table>
      <p>Response times may be extended during major holidays. All communication is handled asynchronously across time zones.</p>

      <h2>What Feedback We Value Most</h2>
      <p>Your input directly shapes the future of LinkSnap. We especially appreciate:</p>
      <ul>
        <li>Bug reports with clear reproduction steps</li>
        <li>Feature ideas that improve everyday link management workflows</li>
        <li>UX and accessibility improvement suggestions</li>
        <li>Performance optimization feedback</li>
        <li>Security recommendations</li>
        <li>Ideas for integrations with other tools and platforms</li>
      </ul>
      <p>Every piece of feedback is read and considered. Contributors, bug reporters, feature requesters, and security researchers are acknowledged and credited in our release notes.</p>

      <h2>Additional Resources</h2>
      <ul>
        <li><a href="#">Privacy Policy</a> — How LinkSnap handles your data</li>
        <li><a href="#">Terms of Service</a> — Usage terms and conditions</li>
        <li><a href="#">Support & FAQ</a> — Troubleshooting and common questions</li>
        <li><a href="#">SECURITY.md</a> — Technical security documentation</li>
        <li><a href="#">README</a> — Product overview and setup guide</li>
        <li><a href="https://github.com/sumanthkatta-dev/linksnap">GitHub Repository</a></li>
      </ul>

      <p><em>Thank you for using LinkSnap. Every message, issue, and suggestion helps make it better for everyone. Let's build something great together.</em></p>
    </div>
  );

  return <DocumentPage title="Contact Developer" content={content} onClose={onClose} />;
};

export default ContactPage;
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

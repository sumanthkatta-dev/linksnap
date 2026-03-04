import React, { useEffect, useRef } from 'react';
import { X, Check, Zap, Rocket, Gift, Mail, ArrowRight } from 'lucide-react';

interface PricingPageProps {
  onClose: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    };

    resetScroll();
    requestAnimationFrame(resetScroll);
  }, []);

  const plans = [
    {
      name: 'Free',
      icon: Gift,
      tagline: 'Always free. No credit card. No catch.',
      description: 'Perfect for individuals who want a fast, private, and powerful way to manage their links without spending a penny.',
      price: 'Free',
      cta: 'Start Free — No Sign-Up Required',
      features: [
        'Upload and extract links from screenshots using AI',
        'Store unlimited bookmarks locally on your device',
        'Organize links with categories and tags',
        'Export your saved links as PDF or JSON',
        '60 AI requests per minute (Google free tier)',
        '100% private — your data never leaves your device',
        'Works offline for saved bookmarks',
        'Installable as a PWA',
      ],
      highlight: false,
    },
    {
      name: 'Pro',
      icon: Zap,
      tagline: 'For people who mean business. Fast enough to keep up with you.',
      description: 'You know that moment when you have 12 screenshots open, three browser tabs, and a deadline in an hour? Pro was built for exactly that.',
      price: 'Request Access',
      cta: 'Request Pro Access',
      features: [
        'Everything in Free, plus:',
        '**Faster image processing** — extraction happens before you can say "Gemini"',
        '**Bulk screenshot uploads** — drop multiple screenshots at once',
        '**Higher API quota** — more requests, fewer interruptions',
        '**Advanced link organization** — smart folders, nested categories',
        '**Priority support** — skip the queue, get answers faster',
        '**Early access to new features**',
      ],
      highlight: true,
    },
    {
      name: 'Max',
      icon: Rocket,
      tagline: 'Built for teams. Powered by speed. Dangerously efficient.',
      description: 'If Pro is fast, Max is "did-that-just-happen" fast. Blink and your links are already extracted, categorized, and waiting for you.',
      price: 'Request Access',
      cta: 'Request Max Access',
      features: [
        'Everything in Pro, plus:',
        '**Instant image processing** — we\'re not joking. Upload. Done.',
        '**Team Collaboration** — one shared workspace, multiple team members',
        '**Role-based access** — Admin, Editor, and Viewer permissions',
        '**Shared categories, tags, and collections**',
        '**Activity log** — see who added, edited, or deleted what',
        '**Highest API quota** — built for heavy workflows',
        '**Bulk processing at scale** — handle dozens of screenshots',
        '**Dedicated priority support** — direct line to the developer',
        '**Custom branding** — white-label LinkSnap (coming soon)',
      ],
      highlight: false,
    },
  ];

  const comparisonFeatures = [
    { name: 'AI Link Extraction', free: true, pro: true, max: true },
    { name: 'Local Storage & Privacy', free: true, pro: true, max: true },
    { name: 'PDF & JSON Export', free: true, pro: true, max: true },
    { name: 'Offline Access', free: true, pro: true, max: true },
    { name: 'Faster Image Processing', free: false, pro: true, max: true },
    { name: 'Bulk Screenshot Uploads', free: false, pro: true, max: true },
    { name: 'Higher API Quota', free: false, pro: true, max: true },
    { name: 'Priority Support', free: false, pro: true, max: true },
    { name: 'Team Collaboration', free: false, pro: false, max: true },
    { name: 'Role-Based Access', free: false, pro: false, max: true },
    { name: 'Shared Workspace', free: false, pro: false, max: true },
    { name: 'Activity Log', free: false, pro: false, max: true },
    { name: 'Custom Branding', free: false, pro: false, max: 'soon' },
  ];

  const faqs = [
    {
      q: 'Do I need a credit card to use the Free plan?',
      a: 'Never. The Free plan is permanently free with no payment information required.',
    },
    {
      q: 'How do I request Pro or Max access?',
      a: 'Email us at linksnap.ai@gmail.com with the subject line [PRO REQUEST] or [MAX REQUEST] and tell us a bit about how you plan to use LinkSnap. We\'ll get back to you within 24–48 hours.',
    },
    {
      q: 'Why don\'t you show prices publicly?',
      a: 'We\'re in early access and working with users directly to understand their needs. This lets us offer the right plan at the right price for your specific use case rather than a one-size-fits-all number.',
    },
    {
      q: 'Can I upgrade from Free to Pro or Max later?',
      a: 'Absolutely. Start free, get comfortable with LinkSnap, and upgrade whenever you\'re ready.',
    },
    {
      q: 'What does Team Collaboration mean exactly?',
      a: 'Max plan users get a shared workspace where an entire team can access, add, and organize links together. Think of it as a shared bookmark brain for your whole team — with permissions, roles, and an activity log so nothing gets lost.',
    },
    {
      q: 'Is my team\'s data private on the Max plan?',
      a: 'Yes. The same privacy-first principles apply. Team data is shared within your workspace only and is never used for advertising, profiling, or third-party access.',
    },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between mobile-page-padding">
          <h1 className="text-xl font-bold">
            Link<span className="text-nt-red">Snap</span> Pricing
          </h1>
          <button
            onClick={onClose}
            className="w-11 h-11 p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close pricing page"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16 mobile-page-padding">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple, Transparent, No Surprises
          </h2>
          <p className="text-lg text-white/70">
            Choose the plan that fits how you work.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-nothing squircle p-8 ${
                plan.highlight
                  ? 'border-nt-red/50 shadow-[0_0_30px_rgba(215,25,33,0.2)]'
                  : 'border-white/10'
              } relative`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-nt-red rounded-full text-xs font-bold">
                  POPULAR
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-nt-red/10 border border-nt-red/30 flex items-center justify-center">
                  <plan.icon className="w-6 h-6 text-nt-red" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
              </div>

              <p className="text-sm font-semibold text-white/90 mb-3">
                {plan.tagline}
              </p>
              <p className="text-xs text-white/60 mb-6 leading-relaxed">
                {plan.description}
              </p>

              <div className="mb-6">
                <div className="text-2xl font-bold text-nt-red mb-1">
                  {plan.price}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-nt-red mt-0.5 flex-shrink-0" />
                    <span
                      className="text-white/80"
                      dangerouslySetInnerHTML={{
                        __html: feature.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>'),
                      }}
                    />
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:linksnap.ai@gmail.com?subject=${encodeURIComponent(
                  plan.name === 'Free' ? 'LinkSnap Inquiry' : `[${plan.name.toUpperCase()} REQUEST]`
                )}`}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  plan.highlight
                    ? 'bg-nt-red hover:bg-nt-red/90 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-8">
            Plan Comparison at a Glance
          </h3>
          <div className="glass-nothing squircle p-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4">Free</th>
                  <th className="text-center py-4 px-4">Pro</th>
                  <th className="text-center py-4 px-4">Max</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx} className="border-b border-white/5">
                    <td className="py-4 px-4 text-white/80">{feature.name}</td>
                    <td className="text-center py-4 px-4">
                      {feature.free === true ? (
                        <Check className="w-5 h-5 text-nt-red inline" />
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {feature.pro === true ? (
                        <Check className="w-5 h-5 text-nt-red inline" />
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {feature.max === true ? (
                        <Check className="w-5 h-5 text-nt-red inline" />
                      ) : feature.max === 'soon' ? (
                        <span className="text-nt-red text-xs">🔜</span>
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions About Plans
          </h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-nothing squircle p-6">
                <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-white/70 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center glass-nothing squircle p-8">
          <Mail className="w-8 h-8 text-nt-red mx-auto mb-4" />
          <p className="text-white/70 mb-4">
            Not sure which plan is right for you?
          </p>
          <a
            href="mailto:linksnap.ai@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-nt-red hover:bg-nt-red/90 text-white rounded-lg font-semibold transition-all"
          >
            Email us and we'll help you figure it out
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

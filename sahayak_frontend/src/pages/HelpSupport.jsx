import { useNavigate } from 'react-router-dom';

const FAQ = [
  {
    q: 'How does Sahayak match me with schemes?',
    a: 'We use your onboarding profile — age, location, income, occupation, category — to automatically surface government schemes you are eligible for.',
  },
  {
    q: 'Can I update my profile after onboarding?',
    a: 'Yes! Click the profile avatar in the top-right corner and choose "Edit Profile". Your scheme recommendations refresh automatically.',
  },
  {
    q: 'Is my personal data safe?',
    a: 'Your data is stored securely and is only used to match you with relevant government schemes. We never share it with third parties.',
  },
  {
    q: 'How do I apply for a scheme?',
    a: 'Click on any scheme card on the dashboard to expand it. The "How to Apply" section will guide you to the official government portal.',
  },
  {
    q: 'Why are some schemes not showing up?',
    a: 'Scheme eligibility is based on your profile. Try completing all fields in Edit Profile to improve your match accuracy.',
  },
];

const CONTACT = [
  { icon: '📧', title: 'Email Support', value: 'support@sahayak.in', sub: 'Response within 24 hours', color: '#3B82F6' },
  { icon: '💬', title: 'WhatsApp', value: '+91 99999 99999', sub: 'Mon–Fri, 9 am – 6 pm IST', color: '#25D366' },
  { icon: '📞', title: 'Helpline', value: '1800-XXX-XXXX', sub: 'Toll-free · Available 24 × 7', color: '#E98A15' },
];

export default function HelpSupport() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={{ background: 'linear-gradient(145deg, #060E1C 0%, #0F1B30 30%, #1A2C50 65%, #243965 100%)' }}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #E98A15, transparent)' }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3E5C8A, transparent)' }} />
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4 backdrop-blur-md"
        style={{ background: 'rgba(6,14,28,0.85)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-indigo-300 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>
        <div className="flex-1 text-center">
          <h1 className="font-display text-base font-bold text-white">Help &amp; Support</h1>
        </div>
        <div className="w-16" /> {/* spacer to center title */}
      </header>

      <main className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 space-y-7">

        {/* Hero */}
        <div
          className="rounded-2xl p-6 text-center animate-fade-up"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-4xl mb-3">🤝</p>
          <h2 className="font-display text-xl font-bold text-white mb-1">How can we help you?</h2>
          <p className="text-sm text-indigo-400 mb-4">Browse the FAQs or reach out directly to our team</p>
          <div
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl max-w-sm mx-auto"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)' }}
          >
            <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search help topics…"
              className="bg-transparent text-sm text-white placeholder-indigo-500 outline-none flex-1"
            />
          </div>
        </div>

        {/* Contact options */}
        <section className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Contact Us</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CONTACT.map((c) => (
              <div
                key={c.title}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center cursor-pointer transition-all duration-200 hover:-translate-y-1"
                style={{ background: `${c.color}10`, border: `1.5px solid ${c.color}25` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${c.color}1A`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${c.color}10`; }}
              >
                <span className="text-2xl">{c.icon}</span>
                <p className="text-xs font-bold text-white">{c.title}</p>
                <p className="text-xs font-semibold" style={{ color: c.color }}>{c.value}</p>
                <p className="text-[10px] text-indigo-400">{c.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.07)' }}
              >
                <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer list-none text-sm font-semibold text-white select-none hover:bg-white/5 transition-colors">
                  {item.q}
                  <svg
                    className="w-4 h-4 text-indigo-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </summary>
                <p
                  className="px-5 pb-4 pt-2 text-sm text-indigo-300 leading-relaxed"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Quick links */}
        <section className="animate-fade-up pb-8" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Quick Links</h3>
          <div className="flex flex-wrap gap-2">
            {['Report a Bug', 'Privacy Policy', 'Terms of Service', 'About Sahayak'].map((link) => (
              <button
                key={link}
                type="button"
                className="text-xs font-semibold px-4 py-2 rounded-full text-indigo-300 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)' }}
              >
                {link}
              </button>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

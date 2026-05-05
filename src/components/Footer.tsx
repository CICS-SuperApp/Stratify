import { useNavigate } from 'react-router-dom';

const leftColumn = [
  { text: 'Home', href: '/' },
  { text: 'Innovation', href: '/#innovation-section' },
  { text: 'Services', href: '/#services-section' },
  { text: 'Contact', href: '/kontakt' },
];

const rightColumn = [
  { text: 'Privacy Policy', href: '#', external: false },
  { text: 'Imprint', href: '#', external: false },
  { text: 'Instagram', href: 'https://instagram.com', external: true },
  { text: 'LinkedIn', href: 'https://linkedin.com', external: true },
];

export default function Footer() {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === '#') return;
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = href.replace('/#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-[#1B1B18]" style={{ padding: 'clamp(60px, 13vw, 188px) clamp(30px, 6.25vw, 90px) 50px' }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
          {/* Left Column — Logo */}
          <div>
            <h2
              className="font-serif text-[#EDE8E4] font-normal"
              style={{
                fontSize: 'clamp(60px, 6vw, 87px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              STRATIFY LABS
            </h2>
            <p className="font-sans text-[#EDE8E4] font-medium mt-4 body-main">
              Innovative IT-Solutions
            </p>
          </div>

          {/* Right Column — Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              {leftColumn.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="footer-link text-[#EDE8E4] hover:text-[#BCC1B7] transition-colors duration-250"
                >
                  {link.text}
                </a>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              {rightColumn.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="footer-link text-[#EDE8E4] hover:text-[#BCC1B7] transition-colors duration-250"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#BCC1B7] mt-16 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <span className="font-sans text-sm font-medium text-[#EDE8E4]">Stratify Labs 2026</span>
          <span className="font-sans text-sm font-medium text-[#EDE8E4]">Stratify Labs GbR</span>
        </div>
      </div>
    </footer>
  );
}

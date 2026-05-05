import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import gsap from 'gsap';

const navLinks = [
  { label: 'Innovation', targetId: 'innovation-section', isPageLink: false },
  { label: 'Services', targetId: 'services-section', isPageLink: false },
  { label: 'Contact', targetId: '', isPageLink: true },
];

export default function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollDirection, isPastThreshold } = useScrollDirection(100);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const isHidden = isPastThreshold && scrollDirection === 'down';

  // Track active section on home page
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const sectionIds = ['innovation-section', 'services-section', 'contact-section'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section!));
    return () => observer.disconnect();
  }, [isHomePage]);

  // Animate mobile menu links
  useEffect(() => {
    if (isMobileOpen) {
      const links = document.querySelectorAll('.mobile-nav-link');
      if (links.length > 0) {
        gsap.fromTo(
          Array.from(links),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power3.out', delay: 0.1 }
        );
      }
    }
  }, [isMobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
      e.preventDefault();
      setIsMobileOpen(false);

      if (link.isPageLink) {
        // Navigate to separate page
        navigate('/kontakt');
        return;
      }

      if (!isHomePage) {
        // Navigate to home then scroll
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(link.targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      } else {
        // Just scroll
        const el = document.getElementById(link.targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [isHomePage, navigate]
  );

  return (
    <>
      {/* Sticky Navigation Bar */}
      <nav
        className="fixed top-2.5 left-1/2 z-[199] w-[calc(100%-20px)] max-w-[1440px] rounded-[10px] px-6 py-2.5 flex items-center justify-between"
        style={{
          backgroundColor: '#1B1B18',
          transform: `translateX(-50%) translateY(${isHidden && !isMobileOpen ? '-120%' : '0'})`,
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-4 font-serif text-[#EDE8E4] text-2xl font-bold tracking-[0.05em] uppercase"
        >
          <img src="/images/Stratify%20Logo.png" alt="Stratify Labs Logo" className="h-14 w-auto object-contain scale-150 origin-center" />
          <span>Stratify Labs</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.isPageLink ? '/kontakt' : `/#${link.targetId}`}
              onClick={(e) => handleNavClick(e, link)}
              className="relative font-sans text-sm font-bold uppercase tracking-[0.05em] text-[#EDE8E4] py-1 group"
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 w-full h-px bg-[#EDE8E4] transition-opacity duration-250"
                style={{
                  opacity:
                    (link.isPageLink && location.pathname === '/kontakt') ||
                    activeSection === link.targetId
                      ? 1
                      : 0,
                }}
              />
              <span className="absolute bottom-0 left-0 w-full h-px bg-[#EDE8E4] opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden relative z-10 w-6 h-5 flex flex-col justify-between"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Menu"
        >
          <span
            className="block w-full h-0.5 bg-[#EDE8E4] transition-all duration-300 origin-center"
            style={{
              transform: isMobileOpen ? 'translateY(9px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-full h-0.5 bg-[#EDE8E4] transition-all duration-300"
            style={{ opacity: isMobileOpen ? 0 : 1, transform: isMobileOpen ? 'scaleX(0)' : 'scaleX(1)' }}
          />
          <span
            className="block w-full h-0.5 bg-[#EDE8E4] transition-all duration-300 origin-center"
            style={{
              transform: isMobileOpen ? 'translateY(-9px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[200] bg-[#1B1B18] flex flex-col items-center justify-center gap-8"
          onClick={() => setIsMobileOpen(false)}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.isPageLink ? '/kontakt' : `/#${link.targetId}`}
              onClick={(e) => {
                e.stopPropagation();
                handleNavClick(e, link);
              }}
              className="mobile-nav-link font-serif text-5xl md:text-7xl font-normal text-[#EDE8E4] opacity-0"
              style={{ letterSpacing: '-0.02em', lineHeight: 1 }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

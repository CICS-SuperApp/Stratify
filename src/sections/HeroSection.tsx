import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const elements = el.querySelectorAll('.hero-animate');
    gsap.set(elements, { opacity: 0, y: 30 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
    });

    return () => { tl.kill(); };
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('innovation-section') || document.getElementById('history-section') || document.getElementById('services-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="bg-[#EDE8E4] min-h-[90vh] flex items-center"
      style={{ padding: '125px clamp(30px, 6.25vw, 90px) 0' }}
    >
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[45%_55%] gap-5 items-center">
        {/* Left Column — Text */}
        <div className="flex flex-col justify-center min-w-0 pt-16">
          <div className="hero-animate mb-6">
            <span className="text-[#05d586] bg-[#dcfceb] px-3 py-1 text-lg font-medium inline-block rounded">
             
            </span>
          </div>

          <h1 className="hero-animate heading-hero text-[#1B1B18] mb-2 font-bold font-sans" style={{ letterSpacing: '-0.02em' }}>
            Your Partner
          </h1>
          <h1 className="hero-animate heading-hero text-[#1B1B18] mb-4 font-bold font-sans" style={{ letterSpacing: '-0.02em' }}>
            for innovative
          </h1>

          <h2 className="hero-animate font-sans font-bold text-[#1B1B18] mb-8"
            style={{
              fontSize: 'clamp(50px, 6.9vw, 100px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            IT Solutions
          </h2>

          <p
            className="hero-animate font-sans text-[#5A5A55] font-medium max-w-[480px] mb-8"
            style={{ fontSize: 'clamp(16px, 1.25vw, 18px)', lineHeight: 1.6, letterSpacing: '0.01em' }}
          >
            We develop custom software solutions that propel your business forward. From Cloud to Security – we make technology accessible and effective.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact-section"
              onClick={handleCtaClick}
              className="hero-animate btn-text bg-[#1B1B18] text-[#EDE8E4] px-8 py-4 rounded-full inline-block hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
            >
              Contact us
            </a>
            <a
              href="#next"
              onClick={handleLearnMoreClick}
              className="hero-animate btn-text bg-transparent text-[#1B1B18] border border-[#1B1B18] px-8 py-4 rounded-full inline-block hover:bg-[#1B1B18] hover:text-[#EDE8E4] active:scale-[0.98] transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Column — Image */}
        <div className="flex justify-center items-center h-full">
          <img
            src="/images/Hero Section Image.png"
            alt="Hero Illustration"
            className="hero-animate w-full max-w-[500px] lg:max-w-none object-contain"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
        </div>
      </div>
    </section>
  );
}

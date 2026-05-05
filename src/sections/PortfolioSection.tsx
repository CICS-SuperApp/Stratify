import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  { title: 'Cloud Migration for SMEs', image: '/images/portfolio-1.jpg' },
  { title: 'Security Audit for Financial Services', image: '/images/portfolio-2.jpg' },
  { title: 'E-Commerce Platform Relaunch', image: '/images/portfolio-3.jpg' },
  { title: 'IoT Integration for Industry 4.0', image: '/images/portfolio-4.jpg' },
  { title: 'Data Analysis Dashboard for Healthcare', image: '/images/portfolio-5.jpg' },
  { title: 'Mobile App for Logistics Companies', image: '/images/portfolio-6.jpg' },
  { title: 'AI-Powered Customer Service', image: '/images/portfolio-7.jpg' },
  { title: 'IT Infrastructure for Startup Hub', image: '/images/portfolio-8.jpg' },
];

const SLIDE_WIDTH_PCT = 35;
const SLIDE_GAP = 20;

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const isAnimating = useRef(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating.current || !trackRef.current) return;
    isAnimating.current = true;

    const totalSlides = portfolioItems.length;
    let targetIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    currentIndexRef.current = targetIndex;

    // Calculate pixel offset
    const slideWidth = trackRef.current.querySelector('.portfolio-slide')?.clientWidth || 400;
    const totalSlideWidth = slideWidth + SLIDE_GAP;

    gsap.to(trackRef.current, {
      x: -targetIndex * totalSlideWidth,
      duration: 1,
      ease: 'power4.inOut',
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, []);

  // Auto-play
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      goToSlide(currentIndexRef.current + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered, goToSlide]);

  // Header scroll animation
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      const elements = header.querySelectorAll('.portfolio-animate');
      gsap.set(elements, { opacity: 0, y: 30 });
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handlePrev = () => goToSlide(currentIndexRef.current - 1);
  const handleNext = () => goToSlide(currentIndexRef.current + 1);

  return (
    <section
      ref={sectionRef}
      id="portfolio-section"
      className="bg-[#1B1B18] overflow-hidden"
      style={{ padding: 'clamp(60px, 13vw, 188px) 0' }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="max-w-[1440px] mx-auto flex items-end justify-between mb-12"
        style={{ padding: '0 clamp(30px, 6.25vw, 90px)' }}
      >
        <div>
          <span className="portfolio-animate section-label text-[#BCC1B7] mb-4 block">
            Projects
          </span>
          <h2 className="portfolio-animate heading-section text-[#EDE8E4]">
            Our Work
          </h2>
        </div>

        {/* Navigation Arrows - Desktop */}
        <div className="hidden md:flex items-center gap-4 portfolio-animate">
          <button
            onClick={handlePrev}
            className="text-[#EDE8E4] hover:text-[#BCC1B7] transition-colors duration-250 text-2xl px-2 py-1"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="text-[#EDE8E4] hover:text-[#BCC1B7] transition-colors duration-250 text-2xl px-2 py-1"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{
            gap: `${SLIDE_GAP}px`,
            paddingLeft: 'clamp(30px, 6.25vw, 90px)',
            paddingRight: 'clamp(30px, 6.25vw, 90px)',
            width: 'max-content',
          }}
        >
          {portfolioItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="portfolio-slide flex-shrink-0 group"
              style={{ width: `clamp(280px, ${SLIDE_WIDTH_PCT}vw, 420px)` }}
            >
              <div className="relative overflow-hidden rounded-[10px]" style={{ aspectRatio: '3/2' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-100"
                  style={{ filter: 'brightness(0.85)' }}
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)',
                  }}
                />
                {/* Title */}
                <h3
                  className="absolute bottom-4 left-4 right-4 font-serif text-[#EDE8E4] font-normal transition-colors duration-300 group-hover:text-[#BCC1B7]"
                  style={{
                    fontSize: 'clamp(18px, 2.2vw, 30px)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center justify-center gap-6 mt-8">
        <button
          onClick={handlePrev}
          className="text-[#EDE8E4] hover:text-[#BCC1B7] transition-colors duration-250 text-2xl px-3 py-2"
          aria-label="Previous"
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className="text-[#EDE8E4] hover:text-[#BCC1B7] transition-colors duration-250 text-2xl px-3 py-2"
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    company: 'TechNova',
    date: 'March 25, 2026',
    text: 'Stratify Labs transformed our legacy systems into a modern, scalable infrastructure. Their expertise is unmatched.',
    rating: 5,
  },
  {
    company: 'Global Logistics',
    date: 'March 20, 2026',
    text: 'The new mobile application improved our delivery times by 30%. Absolutely brilliant team.',
    rating: 5,
  },
  {
    company: 'Healthcare Innovations',
    date: 'February 15, 2026',
    text: 'Security and compliance were our top priorities. Stratify Labs delivered a flawless data dashboard.',
    rating: 5,
  },
  {
    company: 'Eco Solutions',
    date: 'January 10, 2026',
    text: 'Our e-commerce platform relaunch went smoother than we could have ever imagined. High quality work.',
    rating: 5,
  },
];

// Duplicate enough times to ensure it fills the screen for ultra-wide displays
const marqueeItems = [...reviews, ...reviews, ...reviews];

export default function ClientReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const elements = header.querySelectorAll('.reviews-animate');
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="client-reviews-section"
      className="bg-[#0A0D10] overflow-hidden"
      style={{ padding: 'clamp(60px, 10vw, 120px) 0' }}
    >
      <div
        ref={headerRef}
        className="max-w-[1440px] mx-auto mb-16"
        style={{ padding: '0 clamp(30px, 6.25vw, 90px)' }}
      >
        <span className="reviews-animate section-label text-[#BCC1B7] mb-4 block">
          Testimonials
        </span>
        <h2 className="reviews-animate heading-section text-[#EDE8E4]">
          Client Reviews
        </h2>
      </div>

      {/* Infinite Marquee Container */}
      <div className="flex overflow-hidden group">
        <div className="animate-marquee flex whitespace-nowrap min-w-max group-hover:[animation-play-state:paused]">
          {marqueeItems.map((review, idx) => (
            <div
              key={`marquee-1-${idx}`}
              className="flex-shrink-0 mx-4 bg-[#14181D] border border-[#EDE8E4]/5 rounded-2xl p-8 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]"
              style={{ width: 'clamp(320px, 25vw, 480px)', minHeight: '320px' }}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#EDE8E4]/60">
                    {review.date}
                  </span>
                  <div className="flex gap-1 text-[#E5B159]">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
                <h3 className="font-serif text-[clamp(20px,1.8vw,28px)] text-[#EDE8E4] leading-[1.3] mb-6 whitespace-normal">
                  "{review.text}"
                </h3>
              </div>
              <div className="font-sans text-sm font-medium text-[#EDE8E4]/80 tracking-wide">
                — {review.company}
              </div>
            </div>
          ))}
        </div>
        
        {/* Second identical block for seamless loop */}
        <div className="animate-marquee flex whitespace-nowrap min-w-max group-hover:[animation-play-state:paused]">
          {marqueeItems.map((review, idx) => (
            <div
              key={`marquee-2-${idx}`}
              className="flex-shrink-0 mx-4 bg-[#14181D] border border-[#EDE8E4]/5 rounded-2xl p-8 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]"
              style={{ width: 'clamp(320px, 25vw, 480px)', minHeight: '320px' }}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#EDE8E4]/60">
                    {review.date}
                  </span>
                  <div className="flex gap-1 text-[#E5B159]">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
                <h3 className="font-serif text-[clamp(20px,1.8vw,28px)] text-[#EDE8E4] leading-[1.3] mb-6 whitespace-normal">
                  "{review.text}"
                </h3>
              </div>
              <div className="font-sans text-sm font-medium text-[#EDE8E4]/80 tracking-wide">
                — {review.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

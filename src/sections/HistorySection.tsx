import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const yearItems = [
  { year: '2024', text: 'Stratify Labs is founded' },
  { year: '2025', text: '50+ clients worldwide' },
  { year: '2026', text: 'Our new chapter' },
];

export default function HistorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Background color transition timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      // Animate background color
      tl.to(section, {
        backgroundColor: '#1B1B18',
        duration: 1,
        ease: 'none',
      }, 0);

      // Animate text colors
      tl.to(content.querySelectorAll('.history-text-dark'), {
        color: '#EDE8E4',
        duration: 1,
        ease: 'none',
      }, 0);

      // Year items reveal
      const yearItems = content.querySelectorAll('.year-item');
      gsap.set(yearItems, { opacity: 0, y: 30 });

      gsap.to(yearItems, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: content,
          start: 'top 75%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="history-section"
      className="transition-colors duration-0"
      style={{ backgroundColor: '#EDE8E4', padding: '125px 0' }}
    >
      <div
        ref={contentRef}
        className="max-w-[1440px] mx-auto"
        style={{ padding: '0 clamp(30px, 6.25vw, 90px)' }}
      >
        <span className="section-label text-[#BCC1B7] mb-4 block">
          Growth
        </span>

        <h2
          className="history-text-dark heading-section text-[#1B1B18] mb-16 transition-colors duration-0"
        >
          Our History
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5">
          {yearItems.map((item) => (
            <div key={item.year} className="year-item">
              <span className="section-label text-[#BCC1B7] block mb-2">
                {item.year}
              </span>
              <p
                className="history-text-dark font-sans font-medium text-[#1B1B18] transition-colors duration-0"
                style={{ fontSize: 'clamp(16px, 1.25vw, 18px)', lineHeight: 1.2, letterSpacing: '0.02em' }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

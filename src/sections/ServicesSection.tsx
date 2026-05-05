import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Cloud Solutions',
    description:
      'We offer scalable cloud services that make your company flexible and future-proof. From migration to management – we guide you on your journey to the cloud.',
  },
  {
    number: '02',
    title: 'Software Development',
    description:
      'Custom software for your requirements. Our experts develop intuitive applications that optimize your business processes and delight your users.',
  },
  {
    number: '03',
    title: 'IT Security',
    description:
      'We protect your company from cyber threats. Our security solutions include consulting, implementation, and continuous monitoring for maximum security.',
  },
  {
    number: '04',
    title: 'IT Consulting',
    description:
      'Strategic consulting for your digital transformation. We analyze your processes, identify optimization potential, and develop a clear roadmap for your IT future.',
  },
];

function AccordionItem({
  number,
  title,
  description,
  isOpen,
  onToggle,
}: {
  number: string;
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="rounded-[10px] overflow-hidden transition-shadow duration-300"
      style={{
        backgroundColor: '#1B1B18',
        boxShadow: isOpen ? '0 0 30px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      {/* Header Row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 cursor-pointer text-left gap-4"
      >
        <span
          className="font-serif text-[#EDE8E4] font-normal flex-shrink-0"
          style={{
            fontSize: 'clamp(28px, 3.8vw, 55px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {number}
        </span>

        <span
          className="font-sans text-[#EDE8E4] font-normal flex-1 text-center"
          style={{
            fontSize: 'clamp(18px, 2.8vw, 40px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </span>

        <span
          className="flex-shrink-0 text-[#EDE8E4] transition-transform duration-300"
          style={{
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            fontSize: '24px',
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>

      {/* Content Panel */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? '300px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          className="px-6 pb-5 rounded-[10px] mx-2 mb-2"
          style={{ backgroundColor: '#EDE8E4' }}
        >
          <p
            className="font-sans text-[#1B1B18] font-medium py-4"
            style={{
              fontSize: 'clamp(16px, 1.25vw, 18px)',
              lineHeight: 1.2,
              letterSpacing: '0.02em',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  useEffect(() => {
    const header = headerRef.current;
    const items = itemsRef.current;
    if (!header || !items) return;

    const ctx = gsap.context(() => {
      // Header animation
      const headerEls = header.querySelectorAll('.services-animate');
      gsap.set(headerEls, { opacity: 0, y: 30 });
      gsap.to(headerEls, {
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

      // Accordion items animation
      const accordionItems = items.querySelectorAll('.accordion-item-wrapper');
      gsap.set(accordionItems, { opacity: 0, y: 30 });
      gsap.to(accordionItems, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: items,
          start: 'top 80%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services-section"
      className="bg-[#EDE8E4]"
      style={{ padding: 'clamp(60px, 13vw, 188px) clamp(30px, 2.1vw, 30px)' }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div ref={headerRef}>
          <span className="services-animate section-label text-[#BCC1B7] mb-4 block">
            Services
          </span>
          <h2 className="services-animate heading-section text-[#1B1B18] mb-12">
            Our Solutions
          </h2>
        </div>

        <div ref={itemsRef} className="flex flex-col gap-2.5">
          {services.map((service, index) => (
            <div key={service.number} className="accordion-item-wrapper">
              <AccordionItem
                number={service.number}
                title={service.title}
                description={service.description}
                isOpen={openItems.has(index)}
                onToggle={() => toggleItem(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

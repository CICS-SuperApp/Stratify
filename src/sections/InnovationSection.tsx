import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const proofPoints = [
  { value: 'Cloud', label: 'Infrastructure that scales with demand' },
  { value: 'Secure', label: 'Risk-aware decisions from the start' },
  { value: 'Product', label: 'Software built around real workflows' },
];

const deliverySteps = [
  {
    number: '01',
    title: 'Map',
    text: 'We turn goals, systems, and constraints into a clear technical direction.',
  },
  {
    number: '02',
    title: 'Build',
    text: 'Focused teams design, ship, and refine software with measurable outcomes.',
  },
  {
    number: '03',
    title: 'Evolve',
    text: 'Architecture, security, and automation keep improving after launch.',
  },
];

export default function InnovationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const elements = content.querySelectorAll('.innovation-animate');
      gsap.set(elements, { opacity: 0, y: 30 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: content,
          start: 'top 85%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="innovation-section"
      className="relative bg-[#BCC1B7] overflow-hidden"
      style={{ padding: 'clamp(80px, 12vw, 160px) clamp(30px, 6.25vw, 90px)' }}
    >
      <div ref={contentRef} className="relative z-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 lg:gap-5 items-start">
          <div>
            <span className="innovation-animate section-label text-[#1B1B18] mb-4 block">
              Innovation
            </span>
            <h2 className="innovation-animate heading-section text-[#1B1B18]">
              We Shape the Future
            </h2>
          </div>

          <div className="innovation-animate lg:pt-3">
            <p
              className="font-sans text-[#1B1B18] font-medium max-w-[760px]"
              style={{
                fontSize: 'clamp(20px, 2.3vw, 34px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Innovation at Stratify Labs means turning complex business needs into secure,
              scalable systems with a clear path from idea to production.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-[#1B1B18]/25 pt-6">
              {proofPoints.map((item) => (
                <div key={item.value}>
                  <span className="section-label text-[#1B1B18] block mb-3">
                    {item.value}
                  </span>
                  <p
                    className="font-sans text-[#1B1B18]/75 font-medium"
                    style={{ fontSize: 'clamp(15px, 1.1vw, 17px)', lineHeight: 1.35 }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="innovation-animate mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-[36%_64%] gap-5 items-stretch">
          <div className="bg-[#1B1B18] text-[#EDE8E4] rounded-[10px] p-7 lg:p-9 min-h-[300px] flex flex-col justify-between">
            <span className="section-label text-[#BCC1B7] block mb-12">
              Delivery Lens
            </span>
            <div>
              <h3
                className="font-serif font-normal mb-5"
                style={{
                  fontSize: 'clamp(34px, 4vw, 58px)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Strategy, build, and scale in one flow.
              </h3>
              <p
                className="font-sans text-[#EDE8E4]/70 font-medium max-w-[420px]"
                style={{ fontSize: 'clamp(15px, 1.1vw, 17px)', lineHeight: 1.45 }}
              >
                Every engagement connects practical planning with hands-on engineering,
                so the next step is always visible.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 rounded-[10px] overflow-hidden border border-[#1B1B18]/25 bg-[#EDE8E4]/35">
            {deliverySteps.map((step, index) => (
              <div
                key={step.number}
                className="p-7 lg:p-8 border-[#1B1B18]/25 sm:border-l first:border-l-0 border-t sm:border-t-0 first:border-t-0 flex min-h-[300px] flex-col justify-between"
              >
                <span className="section-label text-[#1B1B18]/70 block">
                  {step.number}
                </span>
                <div>
                  <h3
                    className="font-serif text-[#1B1B18] font-normal mb-4"
                    style={{
                      fontSize: 'clamp(34px, 4vw, 58px)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-sans text-[#1B1B18]/75 font-medium"
                    style={{ fontSize: 'clamp(15px, 1.1vw, 17px)', lineHeight: 1.45 }}
                  >
                    {step.text}
                  </p>
                </div>
                {index < deliverySteps.length - 1 && (
                  <span className="hidden sm:block mt-8 text-[#1B1B18]/45 text-2xl leading-none">
                    &#8594;
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

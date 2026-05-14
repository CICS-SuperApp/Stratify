import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InnovationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const elements = text.querySelectorAll('.innovation-animate');
    gsap.set(elements, { opacity: 0, y: 30 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 85%',
        once: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="innovation-section"
      className="relative bg-[#BCC1B7] min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ padding: '60px clamp(30px, 6.25vw, 90px)' }}
    >
      {/* Text overlay and Video */}
      <div ref={textRef} className="relative z-10 flex flex-col justify-between h-full flex-grow">
        <div>
          <span className="innovation-animate section-label text-[#1B1B18] mb-4 block">
            Innovation
          </span>
          <h2 className="innovation-animate heading-section text-[#1B1B18]">
            We Shape the Future
          </h2>
        </div>
        
        {/* Video Integration */}
        <div className="innovation-animate self-center lg:self-end mt-12 mb-8 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative z-20 border border-[#EDE8E4]/20">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover block"
            src="/videos/Video Project 1.mp4"
          />
        </div>
      </div>


    </section>
  );
}

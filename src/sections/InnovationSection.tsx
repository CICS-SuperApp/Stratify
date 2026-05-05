import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DodecahedronGallery from '@/components/DodecahedronGallery';
import { useInView } from '@/hooks/useInView';

gsap.registerPlugin(ScrollTrigger);

export default function InnovationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { ref: galleryRef, isInView } = useInView({ threshold: 0.1 });

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
      {/* Text overlay */}
      <div ref={textRef} className="relative z-10">
        <span className="innovation-animate section-label text-[#1B1B18] mb-4 block">
          Innovation
        </span>
        <h2 className="innovation-animate heading-section text-[#1B1B18]">
          We Shape the Future
        </h2>
      </div>

      {/* Full-viewport dodecahedron */}
      <div
        ref={galleryRef}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <DodecahedronGallery
          isInView={isInView}
          className="w-[70vw] h-[70vw] max-w-[700px] max-h-[700px]"
        />
      </div>
    </section>
  );
}

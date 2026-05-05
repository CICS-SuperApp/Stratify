import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  stagger?: number;
  className?: string;
  triggerStart?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  x = 0,
  stagger = 0,
  className = '',
  triggerStart = 'top 90%',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger > 0 ? el.children : el;

    gsap.set(targets, { opacity: 0, y, x });

    const anim = gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger: stagger > 0 ? stagger : undefined,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        once: true,
      },
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [delay, duration, y, x, stagger, triggerStart]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

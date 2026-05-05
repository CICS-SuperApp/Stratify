import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from '@/components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading
      const heading = section.querySelector('.contact-heading');
      if (heading) {
        gsap.set(heading, { opacity: 0, y: 30 });
        gsap.to(heading, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            once: true,
          },
        });
      }

      // Form fields stagger
      const form = section.querySelector('.contact-form-wrapper');
      if (form) {
        const fields = form.querySelectorAll('.form-field');
        gsap.set(fields, { opacity: 0, y: 30 });
        gsap.to(fields, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            once: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="bg-[#EDE8E4]"
      style={{ padding: '125px clamp(30px, 6.25vw, 90px)' }}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-5">
        {/* Left — Heading */}
        <div className="min-w-0 break-words">
          <h2 className="contact-heading heading-section text-[#1B1B18]">
            Let's Work Together
          </h2>
        </div>

        {/* Right — Form */}
        <div className="contact-form-wrapper">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

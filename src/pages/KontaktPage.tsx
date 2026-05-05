import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ContactForm from '@/components/ContactForm';

export default function KontaktPage() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    // Page load animation
    const textEls = page.querySelectorAll('.kontakt-animate');
    gsap.set(textEls, { opacity: 0, y: 30 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(textEls, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
    });

    // Form stagger
    const form = page.querySelector('.kontakt-form-wrapper');
    if (form) {
      const fields = form.querySelectorAll('.form-field, button');
      gsap.set(fields, { opacity: 0, y: 30 });
      tl.to(
        fields,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <main ref={pageRef} className="bg-[#EDE8E4] min-h-screen">
      <div
        className="max-w-[1440px] mx-auto"
        style={{ padding: 'clamp(80px, 10vw, 160px) clamp(30px, 6.25vw, 90px) clamp(60px, 8vw, 120px)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-5">
          {/* Left — Heading + Intro */}
          <div className="min-w-0 break-words">
            <h1 className="kontakt-animate heading-section text-[#1B1B18] mb-6">
              Let's Work Together
            </h1>
            <p
              className="kontakt-animate font-sans text-[#1B1B18] font-medium max-w-[400px]"
              style={{ fontSize: 'clamp(16px, 1.25vw, 18px)', lineHeight: 1.2, letterSpacing: '0.02em' }}
            >
              Do you have a project in mind or want to learn more about our services? Write to us – we look forward to hearing from you.
            </p>
          </div>

          {/* Right — Form */}
          <div className="kontakt-form-wrapper">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}

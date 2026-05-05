import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const images = [
  '/images/dodecahedron-1.jpg',
  '/images/dodecahedron-2.jpg',
  '/images/dodecahedron-3.jpg',
  '/images/dodecahedron-4.jpg',
  '/images/dodecahedron-5.jpg',
];

interface DodecahedronGalleryProps {
  className?: string;
  isInView?: boolean;
}

export default function DodecahedronGallery({ className = '', isInView = true }: DodecahedronGalleryProps) {
  const currentIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      const prev = currentIndexRef.current;
      const next = (prev + 1) % images.length;
      currentIndexRef.current = next;
      
      // Animate transition
      const currentImg = imgRefs.current[prev];
      const nextImg = imgRefs.current[next];
      
      if (currentImg && nextImg) {
        gsap.to(currentImg, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.inOut',
        });
        gsap.fromTo(
          nextImg,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.inOut' }
        );
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ aspectRatio: '1/1' }}>
      {images.map((src, index) => (
        <img
          key={src}
          ref={(el) => { imgRefs.current[index] = el; }}
          src={src}
          alt="3D Dodecahedron"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            opacity: index === 0 ? 1 : 0,
            transform: index === 0 ? 'scale(1)' : 'scale(1.05)',
          }}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  );
}

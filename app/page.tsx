'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { EstimationProvider } from './context/EstimationContext';
import CategorySelector from '@/components/CategorySelector';
import QuestionFlow from '@/components/QuestionFlow';
import PriceEstimate from '@/components/PriceEstimate';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleLetters = titleRef.current?.querySelectorAll('.letter');
      if (titleLetters) {
        gsap.from(titleLetters, {
          opacity: 0,
          y: 60,
          rotation: 20,
          duration: 1,
          stagger: 0.08,
          ease: 'elastic.out(1, 0.3)',
          onUpdate: function () {
            titleLetters.forEach((letter, index) => {
              const hue = (index * 20) % 360;
              (letter as HTMLElement).style.color = `hsl(${hue}, 100%, 70%)`;
            });
          },
        });
      }

      const subtitleLetters = subtitleRef.current?.querySelectorAll('.letter');
      if (subtitleLetters) {
        gsap.from(subtitleLetters, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.6,
        });
      }

      gsap.from('.fade-in', {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power4.out',
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const title = "FairPrice Estimator";
  const subtitle = "Get accurate price estimates for your professional services";

  return (
    <EstimationProvider>
      <main ref={mainRef} className="min-h-screen bg-[var(--background)] p-8 theme-transition">
        <nav className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </nav>
        
        <div className="max-w-5xl mx-auto space-y-16">
          <header className="text-center fade-in">
            <h1 ref={titleRef} className="text-5xl md:text-7xl font-extrabold tracking-tight">
              {title.split('').map((char, index) => (
                <span key={index} className="letter inline-block drop-shadow-[0_0_10px_rgba(255,0,255,0.7)]">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <p ref={subtitleRef} className="mt-6 text-xl md:text-2xl text-[var(--muted)] drop-shadow-[0_0_5px_rgba(255,204,0,0.5)]">
              {subtitle.split('').map((char, index) => (
                <span key={index} className="letter inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
          </header>

          <section className="fade-in">
            <CategorySelector />
          </section>

          <section className="fade-in">
            <QuestionFlow />
          </section>

          <section className="fade-in">
            <PriceEstimate />
          </section>
        </div>
      </main>
    </EstimationProvider>
  );
}
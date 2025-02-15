// app/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { EstimationProvider } from './context/EstimationContext';
import CategorySelector from '@/components/CategorySelector';
import QuestionFlow from '@/components/QuestionFlow';
import PriceEstimate from '@/components/PriceEstimate';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fade-in', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <EstimationProvider>
      <main ref={mainRef} className="min-h-screen bg-background p-8">
        <nav className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </nav>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="text-center fade-in">
            <h1 className="text-4xl font-bold tracking-tight">
              FairPrice Estimator
            </h1>
            <p className="mt-4 text-muted-foreground">
              Get accurate price estimates for your professional services
            </p>
          </header>

          <div className="fade-in">
            <CategorySelector />
          </div>

          <div className="fade-in">
            <QuestionFlow />
          </div>

          <div className="fade-in">
            <PriceEstimate />
          </div>
        </div>
      </main>
    </EstimationProvider>
  );
}
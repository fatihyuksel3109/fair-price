'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { JobCategory, useEstimation } from '@/app/context/EstimationContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { calculatePrice } from '@/utils/pricing';

export default function PriceEstimate() {
  const { state, dispatch } = useEstimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedMinPrice, setAnimatedMinPrice] = useState(0);
  const [animatedMaxPrice, setAnimatedMaxPrice] = useState(0);

  const { minPrice, maxPrice, factors } = calculatePrice({
    category: state.selectedCategory as Exclude<JobCategory, null>,
    complexity: Math.max(1, state.complexity || 1),
    duration: Math.max(1, state.duration || 1),
    requirements: state.requirements || [],
  });

  useLayoutEffect(() => {
    if (state.currentStep === 4 && minPrice > 0 && maxPrice > 0) {
      setIsVisible(true);
      const ctx = gsap.context(() => {
        gsap.from('.price-number', {
          opacity: 0,
          y: 40,
          scale: 0.8,
          duration: 1,
          stagger: 0.2,
          ease: 'elastic.out(1, 0.3)',
        });

        gsap.from('.factor-item', {
          opacity: 0,
          x: -30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.5,
        });

        gsap.from('.reset-button', {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.8,
        });
      }, containerRef);

      const duration = 1000;
      const startTime = performance.now();
      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        setAnimatedMinPrice(Math.floor(progress * minPrice));
        setAnimatedMaxPrice(Math.floor(progress * maxPrice));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);

      return () => ctx.revert();
    } else {
      setIsVisible(false);
    }
  }, [state.currentStep, minPrice, maxPrice]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto">
      <Card className="estimate-card bg-[var(--card)] border-[var(--border)] shadow-[0_0_20px_rgba(255,0,255,0.6)]">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-6 text-center text-[var(--foreground)] drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">
            Estimated Price Range
          </h3>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-sm text-[var(--muted)]">Minimum</p>
              <p className="price-number text-3xl font-bold text-[var(--secondary)] drop-shadow-[0_0_5px_rgba(0,255,204,0.7)]">
                ${animatedMinPrice.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-[var(--muted)]">Maximum</p>
              <p className="price-number text-3xl font-bold text-[var(--accent)] drop-shadow-[0_0_5px_rgba(255,51,102,0.7)]">
                ${animatedMaxPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {factors.length > 0 && (
            <div className="space-y-4 mb-8">
              <h4 className="font-semibold text-[var(--foreground)]">Price Factors</h4>
              {factors.map((factor, index) => (
                <div key={index} className="factor-item flex justify-between items-center">
                  <span className="text-[var(--foreground)]">{factor.label}</span>
                  <span className="text-[var(--secondary)]">${factor.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <Button
              onClick={() => dispatch({ type: 'RESET' })}
              variant="outline"
              className="reset-button flex items-center gap-2 bg-transparent border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
            >
              <RefreshCw className="w-4 h-4" /> Start New Estimate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
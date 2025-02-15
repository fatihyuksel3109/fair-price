// components/PriceEstimate.tsx
'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import { JobCategory, useEstimation } from '@/app/context/EstimationContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { calculatePrice } from '@/utils/pricing';

export default function PriceEstimate() {
  const { state, dispatch } = useEstimation();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedMinPrice, setAnimatedMinPrice] = useState(0);
  const [animatedMaxPrice, setAnimatedMaxPrice] = useState(0);

  console.log('Current State:', {
    currentStep: state.currentStep,
    category: state.selectedCategory,
    complexity: state.complexity,
    duration: state.duration,
    requirements: state.requirements
  });

  // Calculate price with the correct parameter structure
  const { minPrice, maxPrice, factors } = calculatePrice({
    category: state.selectedCategory as Exclude<JobCategory, null>,
    complexity: Math.max(1, state.complexity || 1),
    duration: Math.max(1, state.duration || 1),
    requirements: state.requirements || []
  });

  console.log('Price Calculation:', { minPrice, maxPrice, factors });

  useLayoutEffect(() => {
    if (state.currentStep === 4 && minPrice > 0 && maxPrice > 0) {
      setIsVisible(true);

      const duration = 1000; // 1 second
      const startTime = performance.now();

      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        setAnimatedMinPrice(Math.floor(progress * minPrice));
        setAnimatedMaxPrice(Math.floor(progress * maxPrice));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setIsVisible(false);
    }
  }, [state.currentStep, minPrice, maxPrice]);

  if (!isVisible) return null;

  console.log('Rendering PriceEstimate');

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto">
      <Card className="estimate-card">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Estimated Price Range
          </h3>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Minimum</p>
              <p className="price-number text-3xl font-bold text-primary">
                ${animatedMinPrice.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Maximum</p>
              <p className="price-number text-3xl font-bold text-primary">
                ${animatedMaxPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {factors.length > 0 && (
            <div className="space-y-4 mb-8">
              <h4 className="font-semibold">Price Factors</h4>
              {factors.map((factor, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{factor.label}</span>
                  <span className="text-muted-foreground">
                    ${factor.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <Button
              onClick={() => dispatch({ type: 'RESET' })}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Start New Estimate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
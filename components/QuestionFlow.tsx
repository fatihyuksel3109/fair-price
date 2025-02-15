// components/QuestionFlow.tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useEstimation } from '@/app/context/EstimationContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Activity,
  ListChecks
} from 'lucide-react';

const questions = {
  complexity: {
    title: 'Project Complexity',
    description: 'How complex is your project?',
    icon: Activity,
    min: 1,
    max: 5,
    labels: ['Very Simple', 'Simple', 'Moderate', 'Complex', 'Very Complex']
  },
  duration: {
    title: 'Project Duration',
    description: 'How long do you expect the project to take?',
    icon: Clock,
    min: 1,
    max: 6,
    labels: ['1 week', '2 weeks', '1 month', '2 months', '3 months', '6+ months']
  },
  requirements: {
    title: 'Project Requirements',
    description: 'Select all that apply',
    icon: ListChecks,
    options: [
      'Documentation',
      'Testing',
      'Maintenance',
      'Training',
      'Custom Features',
      'Integration'
    ]
  }
};

export default function QuestionFlow() {
  const { state, dispatch } = useEstimation();
  const containerRef = useRef(null);

  useEffect(() => {
    if (state.currentStep >= 1 && state.currentStep <= 3) {
      const ctx = gsap.context(() => {
        gsap.from('.question-card', {
          opacity: 0,
          x: 100,
          duration: 0.6,
          ease: 'power2.out'
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [state.currentStep]);

  if (state.currentStep < 1 || state.currentStep > 3) return null;

  const handleNext = () => {
    gsap.to('.question-card', {
      opacity: 0,
      x: -100,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => dispatch({ type: 'NEXT_STEP' })
    });
  };

  const handlePrev = () => {
    gsap.to('.question-card', {
      opacity: 0,
      x: 100,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => dispatch({ type: 'PREV_STEP' })
    });
  };

  const renderQuestion = () => {
    const questionStep = state.currentStep - 1;
    const currentQuestion = Object.values(questions)[questionStep];
    const Icon = currentQuestion.icon;

    return (
      <Card className="question-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Icon className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-xl font-semibold">{currentQuestion.title}</h3>
              <p className="text-muted-foreground">{currentQuestion.description}</p>
            </div>
          </div>

          {questionStep === 0 && (
            <Slider
              value={[state.complexity]}
              min={1}
              max={5}
              step={1}
              onValueChange={([value]) => dispatch({ type: 'SET_COMPLEXITY', payload: value })}
              className="mb-8"
            />
          )}

          {questionStep === 1 && (
            <Slider
              value={[state.duration]}
              min={1}
              max={6}
              step={1}
              onValueChange={([value]) => dispatch({ type: 'SET_DURATION', payload: value })}
              className="mb-8"
            />
          )}

          {questionStep === 2 && (
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((req) => (
                <Button
                  key={req}
                  variant={state.requirements.includes(req) ? "default" : "outline"}
                  onClick={() => dispatch({ type: 'ADD_REQUIREMENT', payload: req })}
                  className="justify-start"
                >
                  {req}
                </Button>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto">
      {renderQuestion()}
    </div>
  );
}
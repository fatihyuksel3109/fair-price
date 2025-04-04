'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useEstimation } from '@/app/context/EstimationContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ChevronLeft, ChevronRight, Clock, Activity, ListChecks } from 'lucide-react';

type Question = {
  title: string;
  description: string;
  icon: React.ComponentType;
  min?: number;
  max?: number;
  labels?: string[];
  options?: string[];
  categorySpecific?: Record<string, string>;
};

const complexityDescriptions: Record<string, { simple: string; moderate: string; complex: string }> = {
  webDev: {
    simple: 'Basic static websites or landing pages',
    moderate: 'E-commerce sites or dashboards with interactivity',
    complex: 'Large-scale SaaS platforms or real-time apps',
  },
  mobileDev: {
    simple: 'Basic apps with limited features',
    moderate: 'Apps with authentication, APIs, or payments',
    complex: 'Scalable apps with real-time features',
  },
  uiux: {
    simple: 'Wireframes or small prototypes',
    moderate: 'Full app/web design with usability testing',
    complex: 'Enterprise design systems',
  },
  seo: {
    simple: 'Keyword research or basic SEO',
    moderate: 'PPC campaigns or social media strategies',
    complex: 'Large-scale content and ad strategies',
  },
  graphics: {
    simple: 'Single logo design or branding materials',
    moderate: 'Branding kits or social media assets',
    complex: 'Full brand identity or marketing collateral',
  },
  content: {
    simple: 'Blog posts or short videos',
    moderate: 'Long-form content or technical writing',
    complex: 'Video editing or complete content strategy',
  },
  consulting: {
    simple: 'One-time business audits',
    moderate: 'Mid-term strategy consulting',
    complex: 'Long-term business transformation plans',
  },
};

const durationDescriptions: Record<string, { simple: string; moderate: string; complex: string }> = {
  webDev: {
    simple: '1-3 months (e.g., landing pages)',
    moderate: '3-6 months (e.g., e-commerce sites)',
    complex: '6+ months (e.g., SaaS platforms)',
  },
  mobileDev: {
    simple: '1-3 months (e.g., basic apps)',
    moderate: '3-6 months (e.g., apps with APIs)',
    complex: '6+ months (e.g., scalable apps)',
  },
  uiux: {
    simple: '1-3 months (e.g., wireframes)',
    moderate: '3-6 months (e.g., full app design)',
    complex: '6+ months (e.g., enterprise systems)',
  },
  seo: {
    simple: '1-3 months (e.g., basic SEO)',
    moderate: '3-6 months (e.g., PPC campaigns)',
    complex: '6+ months (e.g., large-scale strategies)',
  },
  graphics: {
    simple: '1-3 months (e.g., logo design)',
    moderate: '3-6 months (e.g., branding kits)',
    complex: '6+ months (e.g., full brand identity)',
  },
  content: {
    simple: '1-3 months (e.g., blog posts)',
    moderate: '3-6 months (e.g., long-form content)',
    complex: '6+ months (e.g., content strategy)',
  },
  consulting: {
    simple: '1-3 months (e.g., business audits)',
    moderate: '3-6 months (e.g., strategy consulting)',
    complex: '6+ months (e.g., transformation plans)',
  },
};

const requirementsOptions: Record<string, string[]> = {
  webDev: ['Frontend Development', 'Backend Development', 'API Integration', 'Testing', 'Maintenance', 'Custom Features'],
  mobileDev: ['iOS Development', 'Android Development', 'Cross-Platform', 'Push Notifications', 'Testing', 'App Store Deployment'],
  uiux: ['Wireframing', 'Prototyping', 'Usability Testing', 'Design Systems', 'Accessibility', 'User Research'],
  seo: ['Keyword Research', 'On-Page SEO', 'PPC Campaigns', 'Social Media Strategy', 'Analytics', 'Content Marketing'],
  graphics: ['Logo Design', 'Branding Kit', 'Social Media Assets', 'Print Materials', 'Packaging Design', 'Motion Graphics'],
  content: ['Blog Writing', 'Technical Writing', 'Video Editing', 'Script Writing', 'SEO Content', 'Social Media Content'],
  consulting: ['Business Audit', 'Market Analysis', 'Strategy Development', 'Training', 'Implementation Plan', 'Change Management'],
};

const questions: Record<string, Question> = {
  complexity: {
    title: 'Project Complexity',
    description: 'How complex is your project?',
    icon: Activity,
    min: 1,
    max: 3,
    labels: ['Simple', 'Moderate', 'Complex'],
    categorySpecific: complexityDescriptions,
  },
  duration: {
    title: 'Project Duration',
    description: 'How long do you expect the project to take?',
    icon: Clock,
    min: 1,
    max: 3,
    labels: ['1-3 months', '3-6 months', '6+ months'],
    categorySpecific: durationDescriptions,
  },
  requirements: {
    title: 'Project Requirements',
    description: 'Select all that apply',
    icon: ListChecks,
    options: [], // Will be set dynamically based on category
  },
};

export default function QuestionFlow() {
  const { state, dispatch } = useEstimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (containerRef.current && state.currentStep >= 1 && state.currentStep <= 3) {
      console.log('Running GSAP animation for question card');
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.question-card',
          { opacity: 0, x: 150, scale: 0.85 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            onComplete: () => console.log('GSAP animation completed for question card'),
          }
        );

        gsap.fromTo(
          '.question-title .letter',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            delay: 0.2,
          }
        );

        gsap.fromTo(
          '.slider, .option-button',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.4,
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [state.currentStep]);

  if (state.currentStep < 1 || state.currentStep > 3) return null;

  const handleNext = () => {
    gsap.to('.question-card', {
      opacity: 0,
      x: -150,
      scale: 0.85,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => dispatch({ type: 'NEXT_STEP' }),
    });
  };

  const handlePrev = () => {
    gsap.to('.question-card', {
      opacity: 0,
      x: 150,
      scale: 0.85,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => dispatch({ type: 'PREV_STEP' }),
    });
  };

  const renderQuestion = () => {
    const questionStep = state.currentStep - 1;
    const currentQuestion = Object.values(questions)[questionStep];
    const Icon = currentQuestion.icon;
    const title = currentQuestion.title;
    const category = state.selectedCategory || 'webDev'; // Fallback to 'webDev' if category is null

    // Dynamically set description and options based on category
    let description = currentQuestion.description;
    if (currentQuestion.categorySpecific && currentQuestion.categorySpecific[category]) {
      const desc = currentQuestion.categorySpecific[category];
      if (questionStep === 0) {
        description = `Simple: ${desc.simple}\nModerate: ${desc.moderate}\nComplex: ${desc.complex}`;
      } else if (questionStep === 1) {
        description = `1-3 months: ${desc.simple}\n3-6 months: ${desc.moderate}\n6+ months: ${desc.complex}`;
      }
    }

    // Set requirements options dynamically
    const requirementsOptionsForCategory = questionStep === 2 ? requirementsOptions[category] : [];

    return (
      <Card className="question-card bg-[var(--card)] border-[var(--border)] shadow-[0_0_15px_rgba(0,255,255,0.5)]">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-8 text-[var(--accent)] drop-shadow-[0_0_5px_rgba(255,51,102,0.7)]">
              <Icon />
            </span>
            <div>
              <h3 ref={titleRef} className="question-title text-xl font-semibold text-[var(--foreground)]">
                {title.split('').map((char, index) => (
                  <span key={index} className="letter inline-block drop-shadow-[0_0_3px_rgba(255,0,255,0.5)]">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h3>
              <p className="text-[var(--muted)] whitespace-pre-line">{description}</p>
            </div>
          </div>

          {questionStep === 0 && (
            <Slider
              value={[state.complexity]}
              min={1}
              max={3}
              step={1}
              onValueChange={([value]) => dispatch({ type: 'SET_COMPLEXITY', payload: value })}
              className="slider mb-8 [&>span]:bg-[var(--secondary)] [&>span]:shadow-[0_0_5px_rgba(0,255,204,0.7)]"
            />
          )}

          {questionStep === 1 && (
            <Slider
              value={[state.duration]}
              min={1}
              max={3}
              step={1}
              onValueChange={([value]) => dispatch({ type: 'SET_DURATION', payload: value })}
              className="slider mb-8 [&>span]:bg-[var(--secondary)] [&>span]:shadow-[0_0_5px_rgba(0,255,204,0.7)]"
            />
          )}

          {questionStep === 2 && requirementsOptionsForCategory.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {requirementsOptionsForCategory.map((req) => (
                <Button
                  key={req}
                  variant={state.requirements.includes(req) ? 'default' : 'outline'}
                  onClick={() => dispatch({ type: 'ADD_REQUIREMENT', payload: req })}
                  className={`option-button justify-start ${
                    state.requirements.includes(req)
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'bg-transparent border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]'
                  }`}
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
              className="flex items-center gap-2 bg-transparent border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--accent)]"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return <div ref={containerRef} className="max-w-2xl mx-auto">{renderQuestion()}</div>;
}
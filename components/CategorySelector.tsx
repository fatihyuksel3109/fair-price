'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useEstimation } from '@/app/context/EstimationContext';
import type { JobCategory } from '@/app/context/EstimationContext';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Smartphone, Palette, Search, PenTool, FileText, Briefcase } from 'lucide-react';

const categories = [
  { id: 'webDev', icon: Code, label: 'Web Development', description: 'Frontend, Backend, Full Stack, Web Apps' },
  { id: 'mobileDev', icon: Smartphone, label: 'Mobile Development', description: 'iOS, Android, React Native, Flutter' },
  { id: 'uiux', icon: Palette, label: 'UI/UX Design', description: 'Wireframing, Prototyping, Design Systems' },
  { id: 'seo', icon: Search, label: 'SEO & Digital Marketing', description: 'SEO, Ad Campaigns, Social Media' },
  { id: 'graphics', icon: PenTool, label: 'Graphic Design & Branding', description: 'Logos, Branding Kits, Marketing Materials' },
  { id: 'content', icon: FileText, label: 'Content Creation', description: 'Copywriting, Technical Writing, Video Editing' },
  { id: 'consulting', icon: Briefcase, label: 'Consulting & Strategy', description: 'Business Strategy, Tech Consulting' },
];

export default function CategorySelector() {
  const { state, dispatch } = useEstimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && state.currentStep === 0) {
      console.log('Running GSAP animation for category cards');
      const cards = containerRef.current.querySelectorAll('.category-card');
      if (cards.length === 0) {
        console.log('No category cards found for animation');
        return;
      }

      const ctx = gsap.context(() => {
        // Set initial state
        gsap.set(cards, { opacity: 0, y: 50, scale: 0.8, rotation: 10 });

        // Animate to visible state
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.3)',
          onUpdate: function () {
            cards.forEach((card, index) => {
              const hue = (index * 40) % 360;
              (card as HTMLElement).style.borderColor = `hsl(${hue}, 100%, 50%)`;
            });
          },
          onComplete: () => {
            console.log('GSAP animation completed for category cards');
          },
        });

        gsap.to('.category-icon', {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 0.2,
        });

        gsap.to('.category-label', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        });
      }, containerRef);

      return () => ctx.revert();
    } else {
      console.log('GSAP animation skipped: containerRef or step condition not met');
    }
  }, [state.currentStep]);

  const handleCategorySelect = (categoryId: string) => {
    gsap.to('.category-card', {
      opacity: 0,
      y: -30,
      scale: 0.9,
      rotation: -10,
      duration: 0.5,
      stagger: 0.07,
      ease: 'power2.in',
      onComplete: () => {
        dispatch({ type: 'SET_CATEGORY', payload: categoryId as JobCategory });
        dispatch({ type: 'NEXT_STEP' });
      },
    });
  };

  console.log('CategorySelector Render - Current Step:', state.currentStep);

  if (state.currentStep === undefined) {
    console.log('CategorySelector: Waiting for context to initialize');
    return <div className="text-center text-[var(--foreground)]">Loading...</div>;
  }

  if (state.currentStep !== 0) {
    console.log('CategorySelector: Not rendering (step !== 0)');
    return null;
  }

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map(({ id, icon: Icon, label, description }) => (
        <Card
          key={id}
          className={`category-card cursor-pointer transition-all duration-300 bg-[var(--card)] border-[var(--border)] hover:shadow-[0_0_25px_rgba(255,0,255,0.9)] rounded-xl p-2 opacity-1 ${
            state.selectedCategory === id ? 'ring-4 ring-[var(--accent)]' : ''
          }`}
          onClick={() => handleCategorySelect(id)}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Icon className="category-icon w-16 h-16 mb-4 text-[var(--secondary)] drop-shadow-[0_0_8px_rgba(0,255,204,0.8)]" />
            <h3 className="category-label text-xl font-bold mb-2 text-[var(--foreground)] drop-shadow-[0_0_5px_rgba(255,0,255,0.6)]">
              {label}
            </h3>
            <p className="category-label text-sm text-[var(--muted-foreground)]">{description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
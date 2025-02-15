// components/CategorySelector.tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useEstimation } from '@/app/context/EstimationContext';
import type { JobCategory } from '@/app/context/EstimationContext';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Code, 
  Smartphone, 
  Palette, 
  Search, 
  PenTool, 
  FileText, 
  Briefcase 
} from 'lucide-react';

const categories = [
  { id: 'webDev', icon: Code, label: 'Web Development', description: 'Frontend, Backend, Full Stack, Web Apps' },
  { id: 'mobileDev', icon: Smartphone, label: 'Mobile Development', description: 'iOS, Android, React Native, Flutter' },
  { id: 'uiux', icon: Palette, label: 'UI/UX Design', description: 'Wireframing, Prototyping, Design Systems' },
  { id: 'seo', icon: Search, label: 'SEO & Digital Marketing', description: 'SEO, Ad Campaigns, Social Media' },
  { id: 'graphics', icon: PenTool, label: 'Graphic Design & Branding', description: 'Logos, Branding Kits, Marketing Materials' },
  { id: 'content', icon: FileText, label: 'Content Creation', description: 'Copywriting, Technical Writing, Video Editing' },
  { id: 'consulting', icon: Briefcase, label: 'Consulting & Strategy', description: 'Business Strategy, Tech Consulting' }
];

export default function CategorySelector() {
  const { state, dispatch } = useEstimation();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.category-card', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    gsap.to('.category-card', {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        dispatch({ type: 'SET_CATEGORY', payload: categoryId as JobCategory });
        dispatch({ type: 'NEXT_STEP' });
      }
    });
  };

  if (state.currentStep !== 0) return null;

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map(({ id, icon: Icon, label, description }) => (
        <Card 
          key={id}
          className={`category-card cursor-pointer transition-shadow hover:shadow-lg ${
            state.selectedCategory === id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => handleCategorySelect(id)}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Icon className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">{label}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setMounted(true);
    if (buttonRef.current) {
      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });
    }
  }, []);

  if (!mounted) return null;

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="bg-transparent border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)] hover:shadow-[0_0_10px_rgba(0,255,204,0.7)]"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[var(--muted)]" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[var(--muted)]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
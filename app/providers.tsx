'use client';

import { HeroUIProvider as NextUIProvider } from '@heroui/react';
import { ReactNode, useEffect } from 'react';

export function HeroUIProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}

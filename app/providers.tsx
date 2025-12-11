'use client';

import { HeroUIProvider as NextUIProvider } from '@heroui/react';
import { ReactNode } from 'react';

export function HeroUIProvider({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}

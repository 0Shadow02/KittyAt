// components/theme-provider.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const pathname = usePathname();
  const forcedTheme = pathname === '/' || '/auth' ? 'dark' : 'light';

  return (
    <NextThemesProvider
      attribute="class"
      forcedTheme={forcedTheme}
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
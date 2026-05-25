import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import { colors } from '@/constants/theme';

export type ThemeMode = 'dark' | 'light';
export type AppThemeColors = (typeof colors)[ThemeMode];

interface AppThemeContextValue {
  themeMode: ThemeMode;
  colors: AppThemeColors;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const AppThemeContext = createContext<AppThemeContextValue | undefined>(
  undefined,
);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  const toggleTheme = useCallback(() => {
    setThemeMode((currentMode) =>
      currentMode === 'dark' ? 'light' : 'dark',
    );
  }, []);

  const value = useMemo<AppThemeContextValue>(
    () => ({
      themeMode,
      colors: colors[themeMode],
      toggleTheme,
      setThemeMode,
    }),
    [themeMode, toggleTheme],
  );

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider');
  }

  return context;
}

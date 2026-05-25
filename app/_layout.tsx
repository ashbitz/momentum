import '../global.css';

import { Stack } from 'expo-router';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AppThemeProvider, useAppTheme } from '@/context/ThemeContext';

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootLayoutContent />
    </AppThemeProvider>
  );
}

function RootLayoutContent() {
  const { themeMode } = useAppTheme();

  return (
    <GluestackUIProvider mode={themeMode}>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}

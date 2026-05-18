import '../global.css';

import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode={colorScheme ?? 'light'}>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}
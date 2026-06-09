import '../global.css';

import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Stack, useRouter, useSegments } from 'expo-router';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { colors } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AppThemeProvider, useAppTheme } from '@/context/ThemeContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <RootLayoutContent />
      </AppThemeProvider>
    </AuthProvider>
  );
}

function RootLayoutContent() {
  const router = useRouter();
  const segments = useSegments();

  const { themeMode, colors: activeColors } = useAppTheme();
  const { user, isAuthLoading } = useAuth();

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    const isAuthRoute = segments[0] === 'auth';

    if (!user && !isAuthRoute) {
      router.replace('/auth');
      return;
    }

    if (user && isAuthRoute) {
      router.replace('/');
    }
  }, [isAuthLoading, router, segments, user]);

  if (isAuthLoading) {
    return (
      <GluestackUIProvider mode={themeMode}>
        <View
          style={[
            styles.loadingContainer,
            { backgroundColor: activeColors.background },
          ]}
        >
          <ActivityIndicator color={colors.brand.primary} />
        </View>
      </GluestackUIProvider>
    );
  }

  return (
    <GluestackUIProvider mode={themeMode}>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import { LinearGradient } from 'expo-linear-gradient';
import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/context/ThemeContext';

type ScreenContainerProps = PropsWithChildren<{
  withHorizontalPadding?: boolean;
}>;

export function ScreenContainer({
  children,
  withHorizontalPadding = true,
}: ScreenContainerProps) {
  const { colors: activeColors } = useAppTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: activeColors.background },
      ]}
      edges={['top']}
    >
      <LinearGradient
        colors={[
          activeColors.background,
          activeColors.surfaceSoft,
          activeColors.background,
        ]}
        locations={[0, 0.56, 1]}
        style={styles.gradient}
      >
        <View
          style={[
            styles.content,
            withHorizontalPadding ? styles.horizontalPadding : null,
          ]}
        >
          {children}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  horizontalPadding: {
    paddingHorizontal: 24,
  },
});

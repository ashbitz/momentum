import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Momentum</Text>
      <Text style={styles.title}>Your daily progress, in one place.</Text>
      <Text style={styles.description}>
        Track habits, review tasks and keep personal notes from your phone.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.dark.background,
  },
  kicker: {
    marginBottom: spacing.sm,
    color: colors.brand.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: colors.dark.text,
    fontSize: 32,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.md,
    color: colors.dark.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
});
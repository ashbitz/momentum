import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

export default function HabitsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habits</Text>
      <Text style={styles.description}>
        Visual tracking, streaks and daily progress will live here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.dark.background,
  },
  title: {
    color: colors.dark.text,
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.sm,
    color: colors.dark.textMuted,
    fontSize: 16,
  },
});
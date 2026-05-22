import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function HabitsScreen() {
  const habits = useMomentumStore((state) => state.habits);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habits</Text>
      <Text style={styles.description}>
        Visual tracking, streaks and daily progress will live here.
      </Text>

      <View style={styles.list}>
        {habits.map((habit) => (
          <View key={habit.id} style={styles.card}>
            <View style={[styles.colorDot, { backgroundColor: habit.color }]} />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{habit.title}</Text>

              {habit.description ? (
                <Text style={styles.cardDescription}>{habit.description}</Text>
              ) : null}

              <Text style={styles.cardMeta}>
                Target: {habit.targetValue} {habit.unit}
              </Text>

              <Text style={styles.cardMeta}>
                Logs: {habit.logs.length} days tracked
              </Text>
            </View>
          </View>
        ))}
      </View>
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
  list: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: radius.lg,
    backgroundColor: colors.dark.surface,
  },
  colorDot: {
    width: 12,
    height: 12,
    marginTop: 6,
    borderRadius: radius.full,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: colors.dark.text,
    fontSize: 18,
    fontWeight: '700',
  },
  cardDescription: {
    marginTop: spacing.xs,
    color: colors.dark.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  cardMeta: {
    marginTop: spacing.sm,
    color: colors.dark.textMuted,
    fontSize: 13,
  },
});
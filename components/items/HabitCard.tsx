import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import type { Habit } from '@/types';

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.colorDot, { backgroundColor: habit.color }]} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{habit.title}</Text>

        {habit.description ? (
          <Text style={styles.cardDescription}>{habit.description}</Text>
        ) : null}

        <Text style={styles.cardMeta}>
          Objetivo: {habit.targetValue} {habit.unit}
        </Text>

        <Text style={styles.cardMeta}>
          Registros: {habit.logs.length} días
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
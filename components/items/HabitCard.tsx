import { Pressable, StyleSheet, Text, View } from 'react-native';

import { radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import type { Habit } from '@/types';

interface HabitCardProps {
  habit: Habit;
  onPress?: () => void;
}

export function HabitCard({ habit, onPress }: HabitCardProps) {
  const { colors: activeColors } = useAppTheme();

  return (
    <Pressable
      style={[
        styles.card,
        {
          borderColor: activeColors.border,
          backgroundColor: activeColors.surface,
        },
      ]}
      onPress={onPress}
    >
      <View style={[styles.colorDot, { backgroundColor: habit.color }]} />

      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: activeColors.text }]}>
          {habit.title}
        </Text>

        {habit.description ? (
          <Text
            style={[
              styles.cardDescription,
              { color: activeColors.textMuted },
            ]}
          >
            {habit.description}
          </Text>
        ) : null}

        <Text style={[styles.cardMeta, { color: activeColors.textMuted }]}>
          Objetivo: {habit.targetValue} {habit.unit}
        </Text>

        <Text style={[styles.cardMeta, { color: activeColors.textMuted }]}>
          Registros: {habit.logs.length} días
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
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
    fontSize: 18,
    fontWeight: '700',
  },
  cardDescription: {
    marginTop: spacing.xs,
    fontSize: 14,
    lineHeight: 20,
  },
  cardMeta: {
    marginTop: spacing.sm,
    fontSize: 13,
  },
});

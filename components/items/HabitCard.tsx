import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import type { Habit } from '@/types';

interface HabitCardProps {
  habit: Habit;
  onPress?: () => void;
}

const HEATMAP_CELLS = 112;

export function HabitCard({ habit, onPress }: HabitCardProps) {
  const { colors: activeColors } = useAppTheme();
  const streak = 0;
  const habitColor = habit.color || colors.brand.primary;

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
      <View style={styles.headerRow}>
        <View style={styles.titleContent}>
          <Text style={[styles.cardTitle, { color: activeColors.text }]}>
            {habit.title}
          </Text>

          {habit.description ? (
            <Text
              style={[
                styles.cardDescription,
                { color: activeColors.textMuted },
              ]}
              numberOfLines={1}
            >
              {habit.description}
            </Text>
          ) : null}
        </View>

        <View
          style={[
            styles.streakBadge,
            { backgroundColor: streak > 0 ? `${habitColor}1F` : activeColors.surfaceSoft },
          ]}
        >
          <Text style={[styles.streakIcon, { opacity: streak > 0 ? 1 : 0.45 }]}>
            🔥
          </Text>
          <Text
            style={[
              styles.streakText,
              { color: streak > 0 ? habitColor : activeColors.textMuted },
            ]}
          >
            {streak}
          </Text>
        </View>
      </View>

      <View style={styles.heatmap}>
        {Array.from({ length: HEATMAP_CELLS }).map((_, index) => {
          const isActive = index % 9 === 0 || index % 17 === 0;
          const isStrong = index % 23 === 0;

          return (
            <View
              key={index}
              style={[
                styles.heatmapCell,
                {
                  backgroundColor: isStrong
                    ? habitColor
                    : isActive
                      ? `${habitColor}88`
                      : `${habitColor}18`,
                },
              ]}
            />
          );
        })}
      </View>

      <View style={styles.footerRow}>
        <Text style={[styles.cardMeta, { color: activeColors.textMuted }]}>
          Objetivo: {habit.targetValue} {habit.unit}
        </Text>
        <Text style={[styles.cardMetaStrong, { color: habitColor }]}>
          {habit.logs.length} día{habit.logs.length === 1 ? '' : 's'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.xl,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  titleContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  cardDescription: {
    marginTop: 2,
    fontSize: 12,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 3,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  streakIcon: {
    fontSize: 13,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '800',
  },
  heatmap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: spacing.md,
  },
  heatmapCell: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  cardMeta: {
    flex: 1,
    fontSize: 12,
  },
  cardMetaStrong: {
    fontSize: 12,
    fontWeight: '800',
  },
});

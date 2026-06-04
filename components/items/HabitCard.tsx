import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import type { Habit } from '@/types';

interface HabitCardProps {
  habit: Habit;
  onPress?: () => void;
}

const HEATMAP_CELLS = 112;

function toLocalISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getLastDates(totalDays: number) {
  const today = new Date();

  return Array.from({ length: totalDays }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (totalDays - 1 - index));

    return toLocalISODate(date);
  });
}

function normalizeHexColor(hexColor: string) {
  const normalizedHex = hexColor.replace('#', '');

  if (normalizedHex.length !== 6) {
    return null;
  }

  return {
    red: parseInt(normalizedHex.slice(0, 2), 16),
    green: parseInt(normalizedHex.slice(2, 4), 16),
    blue: parseInt(normalizedHex.slice(4, 6), 16),
  };
}

function rgbToHex(red: number, green: number, blue: number) {
  const toHex = (value: number) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function mixHexColors(hexColor: string, baseColor: string, colorWeight: number) {
  const rgbColor = normalizeHexColor(hexColor);
  const rgbBase = normalizeHexColor(baseColor);

  if (!rgbColor || !rgbBase) {
    return hexColor;
  }

  const baseWeight = 1 - colorWeight;

  return rgbToHex(
    rgbColor.red * colorWeight + rgbBase.red * baseWeight,
    rgbColor.green * colorWeight + rgbBase.green * baseWeight,
    rgbColor.blue * colorWeight + rgbBase.blue * baseWeight,
  );
}

function mixWithWhite(hexColor: string, colorWeight: number) {
  return mixHexColors(hexColor, '#FFFFFF', colorWeight);
}

function darkenHexColor(hexColor: string, amount: number) {
  const rgbColor = normalizeHexColor(hexColor);

  if (!rgbColor) {
    return hexColor;
  }

  return rgbToHex(
    rgbColor.red * amount,
    rgbColor.green * amount,
    rgbColor.blue * amount,
  );
}

function getHeatmapColor(
  value: number,
  targetValue: number,
  habitColor: string,
  emptyBaseColor: string,
) {
  const safeTarget = Math.max(targetValue, 1);
  const ratio = value / safeTarget;

  if (ratio <= 0) {
    return mixHexColors(habitColor, emptyBaseColor, 0.08);
  }

  if (ratio < 0.5) {
    return mixWithWhite(habitColor, 0.38);
  }

  if (ratio < 1) {
    return mixWithWhite(habitColor, 0.7);
  }

  if (ratio < 1.5) {
    return habitColor;
  }

  return darkenHexColor(habitColor, 0.72);
}

function getCurrentStreak(habit: Habit) {
  const completedDates = new Set(
    habit.logs
      .filter((log) => log.value >= habit.targetValue)
      .map((log) => log.date),
  );
  const today = new Date();
  let streak = 0;

  for (let offset = 0; offset < HEATMAP_CELLS; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);

    if (!completedDates.has(toLocalISODate(date))) {
      break;
    }

    streak += 1;
  }

  return streak;
}

export function HabitCard({ habit, onPress }: HabitCardProps) {
  const { colors: activeColors } = useAppTheme();
  const streak = getCurrentStreak(habit);
  const habitColor = habit.color || colors.brand.primary;
  const logsByDate = new Map(habit.logs.map((log) => [log.date, log.value]));
  const heatmapDates = getLastDates(HEATMAP_CELLS);

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
          <Text style={[styles.cardTitle, { color: activeColors.text }]}>{habit.title}</Text>

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
          <Text style={[styles.streakIcon, { opacity: streak > 0 ? 1 : 0.45 }]}>🔥</Text>
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
        {heatmapDates.map((date) => {
          const value = logsByDate.get(date) ?? 0;

          return (
            <View
              key={date}
              style={[
                styles.heatmapCell,
                {
                  backgroundColor: getHeatmapColor(
                    value,
                    habit.targetValue,
                    habitColor,
                    activeColors.surfaceSoft,
                  ),
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

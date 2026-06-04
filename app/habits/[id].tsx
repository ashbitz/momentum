import { useEffect } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors, radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { useMomentumStore } from '@/store/useMomentumStore';
import type { Habit } from '@/types';

const DETAIL_HEATMAP_CELLS = 140;

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

  for (let offset = 0; offset < DETAIL_HEATMAP_CELLS; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);

    if (!completedDates.has(toLocalISODate(date))) {
      break;
    }

    streak += 1;
  }

  return streak;
}

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors: activeColors } = useAppTheme();

  const habit = useMomentumStore((state) =>
    state.habits.find((currentHabit) => currentHabit.id === id),
  );
  const isLoading = useMomentumStore((state) => state.isLoading);
  const deleteHabit = useMomentumStore((state) => state.deleteHabit);
  const fetchHabitLogs = useMomentumStore((state) => state.fetchHabitLogs);
  const addHabitProgress = useMomentumStore((state) => state.addHabitProgress);

  useEffect(() => {
    if (!id) {
      return;
    }

    void fetchHabitLogs(id);
  }, [fetchHabitLogs, id]);

  const handleEdit = () => {
    if (!habit) {
      return;
    }

    router.push({
      pathname: '/new-item',
      params: {
        type: 'habit',
        id: habit.id,
      },
    });
  };

  const handleConfirmDelete = async () => {
    if (!habit) {
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await deleteHabit(habit.id);
    router.replace('/(tabs)/habits');
  };

  const handleDelete = () => {
    if (!habit) {
      return;
    }

    Alert.alert(
      'Eliminar hábito',
      `¿Seguro que quieres eliminar "${habit.title}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            void handleConfirmDelete();
          },
        },
      ],
    );
  };

  const handleAddProgress = async () => {
    if (!habit || isLoading) {
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await addHabitProgress(habit.id, toLocalISODate(new Date()), 1);
  };

  if (!habit) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />

        <ScreenContainer>
          <View style={styles.emptyState}>
            <Text style={[styles.title, { color: activeColors.text }]}>
              Hábito no encontrado
            </Text>
            <Text style={[styles.description, { color: activeColors.textMuted }]}>
              Este hábito no existe o ya ha sido eliminado.
            </Text>

            <Pressable
              style={[
                styles.secondaryButton,
                { backgroundColor: activeColors.surface },
              ]}
              onPress={() => router.replace('/(tabs)/habits')}
            >
              <Text
                style={[
                  styles.secondaryButtonText,
                  { color: activeColors.text },
                ]}
              >
                Volver a hábitos
              </Text>
            </Pressable>
          </View>
        </ScreenContainer>
      </>
    );
  }

  const habitColor = habit.color || colors.brand.primary;
  const today = toLocalISODate(new Date());
  const todayLog = habit.logs.find((log) => log.date === today);
  const todayValue = todayLog?.value ?? 0;
  const progressPercentage = Math.min(
    Math.round((todayValue / Math.max(habit.targetValue, 1)) * 100),
    999,
  );
  const heatmapDates = getLastDates(DETAIL_HEATMAP_CELLS);
  const logsByDate = new Map(habit.logs.map((log) => [log.date, log.value]));
  const streak = getCurrentStreak(habit);
  const addProgressLabel = habit.unit
    ? `+ Añadir ${habit.unit}`
    : '+ Añadir progreso';

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScreenContainer withHorizontalPadding={false}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <Pressable hitSlop={16} onPress={() => router.back()}>
              <Text style={styles.topBarIcon}>‹</Text>
            </Pressable>

            <Text style={[styles.topBarTitle, { color: activeColors.text }]}>
              Hábito
            </Text>

            <Pressable hitSlop={16} onPress={handleEdit}>
              <Text style={[styles.topBarIcon, { color: activeColors.textMuted }]}>
                ⋯
              </Text>
            </Pressable>
          </View>

          <Text style={[styles.title, { color: activeColors.text }]}>
            {habit.title}
          </Text>

          {habit.description ? (
            <Text style={[styles.subtitle, { color: activeColors.textMuted }]}>
              {habit.description}
            </Text>
          ) : null}

          <View style={styles.progressBlock}>
            <View
              style={[
                styles.progressRing,
                {
                  borderColor:
                    todayValue === 0
                      ? activeColors.border
                      : habitColor,
                  backgroundColor: activeColors.background,
                },
              ]}
            >
              <Text style={[styles.progressValue, { color: habitColor }]}>
                {progressPercentage}%
              </Text>
            </View>

            <Text style={[styles.progressTitle, { color: activeColors.text }]}>
              Progreso de hoy
            </Text>
            <Text style={[styles.progressText, { color: activeColors.textMuted }]}>
              {todayValue} / {habit.targetValue} {habit.unit || 'actos'}
            </Text>
          </View>

          <View
            style={[
              styles.metricsCard,
              {
                borderColor: activeColors.border,
                backgroundColor: activeColors.surface,
              },
            ]}
          >
            <View style={styles.metricItem}>
              <View style={[styles.targetIcon, { borderColor: habitColor }]}>
                <View style={[styles.targetIconInner, { backgroundColor: habitColor }]} />
              </View>

              <Text style={[styles.metricValue, { color: activeColors.text }]}>
                {habit.targetValue}
              </Text>
              <Text style={[styles.metricLabel, { color: activeColors.textMuted }]}>
                {habit.unit}
              </Text>
            </View>

            <View
              style={[
                styles.metricDivider,
                { backgroundColor: activeColors.border },
              ]}
            />

            <View style={styles.metricItem}>
              <View style={[styles.calendarIcon, { borderColor: habitColor }]}>
                <View style={[styles.calendarIconTop, { backgroundColor: habitColor }]} />
                <View style={styles.calendarIconBody}>
                  <View style={[styles.calendarIconDot, { backgroundColor: habitColor }]} />
                  <View style={[styles.calendarIconDot, { backgroundColor: habitColor }]} />
                  <View style={[styles.calendarIconDot, { backgroundColor: habitColor }]} />
                </View>
              </View>

              <Text style={[styles.metricValue, { color: activeColors.text }]}>
                {streak}
              </Text>
              <Text style={[styles.metricLabel, { color: activeColors.textMuted }]}>
                Días de racha
              </Text>
            </View>
          </View>

          <Pressable
            style={[
              styles.progressButton,
              { backgroundColor: isLoading ? `${habitColor}88` : habitColor },
            ]}
            onPress={handleAddProgress}
            disabled={isLoading}
          >
            <Text style={styles.progressButtonText}>{addProgressLabel}</Text>
          </Pressable>

          <View
            style={[
              styles.heatmapCard,
              {
                borderColor: activeColors.border,
                backgroundColor: activeColors.surface,
              },
            ]}
          >
            <View style={styles.heatmapHeader}>
              <Text style={[styles.heatmapTitle, { color: activeColors.text }]}>
                Actividad
              </Text>
              <Text style={[styles.heatmapMeta, { color: activeColors.textMuted }]}>
                Últimos {DETAIL_HEATMAP_CELLS} días
              </Text>
            </View>

            <View style={styles.heatmapGrid}>
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
          </View>

          <Text style={[styles.createdText, { color: activeColors.textMuted }]}>
            Creado el {new Date(habit.createdAt).toLocaleDateString('es-ES')}
          </Text>

          <Pressable style={styles.primaryButton} onPress={handleEdit}>
            <Text style={styles.primaryButtonText}>Editar hábito</Text>
          </Pressable>

          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Eliminar hábito</Text>
          </Pressable>
        </ScrollView>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  topBarIcon: {
    color: colors.brand.primary,
    fontSize: 26,
    fontWeight: '800',
  },
  topBarTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  description: {
    marginTop: spacing.md,
    fontSize: 17,
    lineHeight: 26,
  },
  progressBlock: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  progressRing: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 86,
    height: 86,
    borderWidth: 5,
    borderRadius: radius.full,
  },
  progressValue: {
    fontSize: 26,
    fontWeight: '800',
  },
  progressTitle: {
    marginTop: spacing.md,
    fontSize: 14,
    fontWeight: '800',
  },
  progressText: {
    marginTop: 2,
    fontSize: 12,
    textAlign: 'center',
  },
  metricsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderRadius: radius.xl,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  targetIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: radius.full,
  },
  targetIconInner: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
  },
  calendarIcon: {
    width: 22,
    height: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: 6,
  },
  calendarIconTop: {
    height: 6,
  },
  calendarIconBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  calendarIconDot: {
    width: 3,
    height: 3,
    borderRadius: radius.full,
  },
  metricValue: {
    marginTop: spacing.sm,
    fontSize: 18,
    fontWeight: '800',
  },
  metricLabel: {
    marginTop: spacing.xs,
    fontSize: 11,
    textAlign: 'center',
  },
  metricDivider: {
    width: 1,
    height: 50,
  },
  progressButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
  },
  progressButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  heatmapCard: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.xl,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  heatmapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  heatmapTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  heatmapMeta: {
    fontSize: 11,
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  heatmapCell: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  createdText: {
    marginTop: spacing.lg,
    fontSize: 12,
    textAlign: 'center',
  },
  primaryButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  deleteButton: {
    alignItems: 'center',
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    backgroundColor: '#FDE7E4',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '800',
  },
});

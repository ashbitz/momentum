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

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors: activeColors } = useAppTheme();

  const habit = useMomentumStore((state) =>
    state.habits.find((currentHabit) => currentHabit.id === id),
  );
  const deleteHabit = useMomentumStore((state) => state.deleteHabit);

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

  const progressPercentage = 0;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScreenContainer withHorizontalPadding={false}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.topBarIcon}>‹</Text>
            </Pressable>

            <Text style={[styles.topBarTitle, { color: activeColors.text }]}>
              Hábito
            </Text>

            <Text style={[styles.topBarIcon, { color: activeColors.textMuted }]}>
              ⋯
            </Text>
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
                    progressPercentage === 0
                      ? activeColors.border
                      : colors.brand.primary,
                  backgroundColor: activeColors.background,
                },
              ]}
            >
              <Text style={styles.progressValue}>{progressPercentage}%</Text>
            </View>

            <Text style={[styles.progressTitle, { color: activeColors.text }]}>
              Progreso del hábito
            </Text>
            <Text style={[styles.progressText, { color: activeColors.textMuted }]}>
              {habit.logs.length} día{habit.logs.length === 1 ? '' : 's'} registrado
              {habit.logs.length === 1 ? '' : 's'}
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
              <View style={styles.targetIcon}>
                <View style={styles.targetIconInner} />
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
              <View style={styles.calendarIcon}>
                <View style={styles.calendarIconTop} />
                <View style={styles.calendarIconBody}>
                  <View style={styles.calendarIconDot} />
                  <View style={styles.calendarIconDot} />
                  <View style={styles.calendarIconDot} />
                </View>
              </View>

              <Text style={[styles.metricValue, { color: activeColors.text }]}>
                {habit.logs.length}
              </Text>
              <Text style={[styles.metricLabel, { color: activeColors.textMuted }]}>
                Días registrados
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.heatmapCard,
              {
                borderColor: activeColors.border,
                backgroundColor: activeColors.surface,
              },
            ]}
          />

          <Text style={[styles.createdText, { color: activeColors.textMuted }]}>
            Creado el {new Date(habit.createdAt).toLocaleDateString('es-ES')}
          </Text>

          <Pressable style={styles.primaryButton}>
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
    color: colors.brand.primary,
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
    borderColor: colors.brand.primary,
  },
  targetIconInner: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  calendarIcon: {
    width: 22,
    height: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: colors.brand.primary,
  },
  calendarIconTop: {
    height: 6,
    backgroundColor: colors.brand.primary,
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
    backgroundColor: colors.brand.primary,
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
  heatmapCard: {
    minHeight: 132,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderRadius: radius.xl,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
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
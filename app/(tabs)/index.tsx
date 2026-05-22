import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function HomeScreen() {
  const router = useRouter();

  const habits = useMomentumStore((state) => state.habits);
  const tasks = useMomentumStore((state) => state.tasks);
  const notes = useMomentumStore((state) => state.notes);

  const pendingTasks = tasks.filter((task) => !task.isCompleted).length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const trackedHabitDays = habits.reduce(
    (total, habit) => total + habit.logs.length,
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Momentum</Text>
      <Text style={styles.title}>Resumen del día</Text>
      <Text style={styles.description}>
        Consulta de un vistazo tus hábitos, tareas y notas personales.
      </Text>

      <Pressable
        style={styles.createButton}
        onPress={() => {
          router.push('/new-item');
        }}
      >
        <Text style={styles.createButtonText}>+ Crear nuevo</Text>
      </Pressable>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{habits.length}</Text>
          <Text style={styles.statLabel}>hábitos activos</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{pendingTasks}</Text>
          <Text style={styles.statLabel}>tareas pendientes</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{notes.length}</Text>
          <Text style={styles.statLabel}>notas guardadas</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{trackedHabitDays}</Text>
          <Text style={styles.statLabel}>registros de hábitos</Text>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Estado actual</Text>
        <Text style={styles.summaryText}>
          Has completado {completedTasks} tarea
          {completedTasks === 1 ? '' : 's'} y tienes {pendingTasks} pendiente
          {pendingTasks === 1 ? '' : 's'}.
        </Text>
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
    marginTop: spacing.sm,
    color: colors.dark.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  createButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  createButtonText: {
    color: colors.dark.text,
    fontSize: 15,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  statCard: {
    width: '47%',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: radius.lg,
    backgroundColor: colors.dark.surface,
  },
  statValue: {
    color: colors.brand.accent,
    fontSize: 28,
    fontWeight: '700',
  },
  statLabel: {
    marginTop: spacing.xs,
    color: colors.dark.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  summaryCard: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: radius.lg,
    backgroundColor: colors.dark.surfaceSoft,
  },
  summaryTitle: {
    color: colors.dark.text,
    fontSize: 18,
    fontWeight: '700',
  },
  summaryText: {
    marginTop: spacing.sm,
    color: colors.dark.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
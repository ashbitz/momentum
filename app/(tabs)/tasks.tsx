import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function TasksScreen() {
  const tasks = useMomentumStore((state) => state.tasks);
  const toggleTask = useMomentumStore((state) => state.toggleTask);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas</Text>
      <Text style={styles.description}>
        Organiza tareas simples y checklists para tu día a día.
      </Text>

      <View style={styles.list}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.card}>
            <Text
              style={styles.checkbox}
              onPress={() => {
                toggleTask(task.id);
              }}
            >
              {task.isCompleted ? '✓' : '○'}
            </Text>

            <View style={styles.cardContent}>
              <Text
                style={[
                  styles.cardTitle,
                  task.isCompleted && styles.cardTitleCompleted,
                ]}
              >
                {task.title}
              </Text>

              {task.description ? (
                <Text style={styles.cardDescription}>{task.description}</Text>
              ) : null}

              <Text style={styles.cardMeta}>
                {task.isCompleted ? 'Completada' : 'Pendiente'}
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
  checkbox: {
    width: 28,
    color: colors.brand.accent,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: colors.dark.text,
    fontSize: 18,
    fontWeight: '700',
  },
  cardTitleCompleted: {
    color: colors.dark.textMuted,
    textDecorationLine: 'line-through',
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
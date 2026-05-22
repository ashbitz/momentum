import { StyleSheet, Text, View } from 'react-native';

import { TaskCard } from '@/components/items/TaskCard';
import { colors, spacing } from '@/constants/theme';
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
          <TaskCard key={task.id} task={task} onToggle={toggleTask} />
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
});
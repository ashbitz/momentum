import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
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

      <View style={styles.listContainer}>
        <FlashList
          data={tasks}
          keyExtractor={(task) => task.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggle={toggleTask}
              onPress={() => {
                router.push({
                  pathname: '/tasks/[id]',
                  params: { id: item.id },
                });
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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
  listContainer: {
    flex: 1,
    marginTop: spacing.lg,
  },
  separator: {
    height: spacing.md,
  },
});
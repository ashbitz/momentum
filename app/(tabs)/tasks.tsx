import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { StyleSheet, Text, View } from 'react-native';

import { TaskCard } from '@/components/items/TaskCard';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function TasksScreen() {
  const { colors: activeColors } = useAppTheme();
  const tasks = useMomentumStore((state) => state.tasks);
  const toggleTask = useMomentumStore((state) => state.toggleTask);

  const handleToggleTask = (id: string) => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    toggleTask(id);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: activeColors.background },
      ]}
    >
      <Text style={[styles.title, { color: activeColors.text }]}>Tareas</Text>
      <Text style={[styles.description, { color: activeColors.textMuted }]}>
        Organiza tareas simples y checklists para tu día a día.
      </Text>

      <View style={styles.listContainer}>
        <FlashList
          data={tasks}
          keyExtractor={(task) => task.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggle={handleToggleTask}
              onPress={() => {
                router.push({
                  pathname: '/tasks/[id]',
                  params: { id: item.id },
                });
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View
              style={[
                styles.emptyContainer,
                {
                  borderColor: activeColors.border,
                  backgroundColor: activeColors.surface,
                },
              ]}
            >
              <Text style={[styles.emptyTitle, { color: activeColors.text }]}>
                No tienes tareas pendientes
              </Text>
              <Text
                style={[
                  styles.emptyDescription,
                  { color: activeColors.textMuted },
                ]}
              >
                Crea una nueva tarea para organizar lo próximo que quieras hacer.
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.sm,
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    marginTop: spacing.lg,
  },
  separator: {
    height: spacing.md,
  },
  emptyContainer: {
    padding: spacing.lg,
    borderWidth: 1,
    borderRadius: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyDescription: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

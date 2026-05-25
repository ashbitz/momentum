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

import { colors, radius, spacing } from '@/constants/theme';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const task = useMomentumStore((state) =>
    state.tasks.find((currentTask) => currentTask.id === id),
  );
  const deleteTask = useMomentumStore((state) => state.deleteTask);
  const toggleTask = useMomentumStore((state) => state.toggleTask);

  const handleToggle = () => {
    if (!task) {
      return;
    }

    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    toggleTask(task.id);
  };

  const handleDelete = () => {
    if (!task) {
      return;
    }

    Alert.alert(
      'Eliminar tarea',
      `¿Seguro que quieres eliminar "${task.title}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            deleteTask(task.id);
            router.replace('/(tabs)/tasks');
          },
        },
      ],
    );
  };

  if (!task) {
    return (
      <>
        <Stack.Screen options={{ title: 'Tarea' }} />

        <View style={styles.container}>
          <Text style={styles.title}>Tarea no encontrada</Text>
          <Text style={styles.description}>
            Esta tarea no existe o ya ha sido eliminada.
          </Text>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.replace('/(tabs)/tasks')}
          >
            <Text style={styles.secondaryButtonText}>Volver a tareas</Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: task.title }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{task.title}</Text>

        {task.description ? (
          <Text style={styles.description}>{task.description}</Text>
        ) : null}

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Estado</Text>
          <Text style={styles.cardValue}>
            {task.isCompleted ? 'Completada' : 'Pendiente'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Creada</Text>
          <Text style={styles.cardValue}>
            {new Date(task.createdAt).toLocaleDateString('es-ES')}
          </Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={handleToggle}>
          <Text style={styles.primaryButtonText}>
            {task.isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
          </Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Eliminar tarea</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.lg,
    backgroundColor: colors.dark.background,
  },
  title: {
    color: colors.dark.text,
    fontSize: 30,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.md,
    color: colors.dark.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: radius.lg,
    backgroundColor: colors.dark.surface,
  },
  cardLabel: {
    color: colors.dark.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  cardValue: {
    marginTop: spacing.xs,
    color: colors.dark.text,
    fontSize: 18,
    fontWeight: '700',
  },
  primaryButton: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.brand.primary,
  },
  primaryButtonText: {
    color: colors.dark.background,
    fontSize: 16,
    fontWeight: '700',
  },
  deleteButton: {
    alignItems: 'center',
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.feedback.error,
  },
  deleteButtonText: {
    color: colors.dark.text,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.dark.surface,
  },
  secondaryButtonText: {
    color: colors.dark.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
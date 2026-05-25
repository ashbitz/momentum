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
import { useAppTheme } from '@/context/ThemeContext';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors: activeColors } = useAppTheme();

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

        <View
          style={[
            styles.container,
            { backgroundColor: activeColors.background },
          ]}
        >
          <Text style={[styles.title, { color: activeColors.text }]}>
            Tarea no encontrada
          </Text>
          <Text style={[styles.description, { color: activeColors.textMuted }]}>
            Esta tarea no existe o ya ha sido eliminada.
          </Text>

          <Pressable
            style={[
              styles.secondaryButton,
              { backgroundColor: activeColors.surface },
            ]}
            onPress={() => router.replace('/(tabs)/tasks')}
          >
            <Text
              style={[
                styles.secondaryButtonText,
                { color: activeColors.text },
              ]}
            >
              Volver a tareas
            </Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: task.title }} />

      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: activeColors.background },
        ]}
      >
        <Text style={[styles.title, { color: activeColors.text }]}>
          {task.title}
        </Text>

        {task.description ? (
          <Text style={[styles.description, { color: activeColors.textMuted }]}>
            {task.description}
          </Text>
        ) : null}

        <View
          style={[
            styles.card,
            {
              borderColor: activeColors.border,
              backgroundColor: activeColors.surface,
            },
          ]}
        >
          <Text style={[styles.cardLabel, { color: activeColors.textMuted }]}>
            Estado
          </Text>
          <Text style={[styles.cardValue, { color: activeColors.text }]}>
            {task.isCompleted ? 'Completada' : 'Pendiente'}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              borderColor: activeColors.border,
              backgroundColor: activeColors.surface,
            },
          ]}
        >
          <Text style={[styles.cardLabel, { color: activeColors.textMuted }]}>
            Creada
          </Text>
          <Text style={[styles.cardValue, { color: activeColors.text }]}>
            {new Date(task.createdAt).toLocaleDateString('es-ES')}
          </Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={handleToggle}>
          <Text
            style={[
              styles.primaryButtonText,
              { color: activeColors.background },
            ]}
          >
            {task.isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
          </Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={[styles.deleteButtonText, { color: activeColors.text }]}>
            Eliminar tarea
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.md,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardValue: {
    marginTop: spacing.xs,
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
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

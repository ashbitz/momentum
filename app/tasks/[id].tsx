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

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors: activeColors } = useAppTheme();

  const task = useMomentumStore((state) =>
    state.tasks.find((currentTask) => currentTask.id === id),
  );
  const deleteTask = useMomentumStore((state) => state.deleteTask);
  const toggleTask = useMomentumStore((state) => state.toggleTask);


  const handleEdit = () => {
    if (!task) {
      return;
    }

    router.push({
      pathname: '/new-item',
      params: {
        type: 'task',
        id: task.id,
      },
    });
  };

  const handleToggle = async () => {
    if (!task) {
      return;
    }

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await toggleTask(task.id);
  };

  const handleConfirmDelete = async () => {
    if (!task) {
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await deleteTask(task.id);
    router.replace('/(tabs)/tasks');
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
            void handleConfirmDelete();
          },
        },
      ],
    );
  };

  if (!task) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />

        <ScreenContainer>
          <View style={styles.emptyState}>
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
        </ScreenContainer>
      </>
    );
  }

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
              Tarea
            </Text>

            <Pressable hitSlop={16} onPress={handleEdit}>
              <Text style={[styles.topBarIcon, { color: activeColors.textMuted }]}>
                ⋯
              </Text>
            </Pressable>
          </View>

          <Text style={[styles.title, { color: activeColors.text }]}>
            {task.title}
          </Text>

          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>
              {task.isCompleted ? 'Completada' : 'Pendiente'}
            </Text>
          </View>

          <View style={styles.progressBlock}>
            <View
              style={[
                styles.checkRing,
                {
                  borderColor: colors.brand.primary,
                  backgroundColor: activeColors.background,
                },
              ]}
            >
              <Text style={styles.checkIcon}>✓</Text>
            </View>

            <Text style={[styles.progressTitle, { color: activeColors.text }]}>
              Progreso de tarea
            </Text>
            <Text style={[styles.progressText, { color: activeColors.textMuted }]}>
              {task.isCompleted
                ? 'Esta tarea ya está completada.'
                : 'Esta tarea sigue pendiente.'}
            </Text>
          </View>

          <View
            style={[
              styles.infoCard,
              {
                borderColor: activeColors.border,
                backgroundColor: activeColors.surface,
              },
            ]}
          >
            <View style={styles.row}>
              <View style={styles.clockIcon}>
                <View style={styles.clockHandVertical} />
                <View style={styles.clockHandHorizontal} />
              </View>

              <View style={styles.rowContent}>
                <Text style={[styles.rowTitle, { color: activeColors.text }]}>
                  Recordatorio
                </Text>
                <Text style={[styles.rowText, { color: activeColors.textMuted }]}>
                  Sin recordatorio
                </Text>
              </View>

              <Text style={[styles.rowArrow, { color: activeColors.textMuted }]}>
                ›
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.infoCard,
              {
                borderColor: activeColors.border,
                backgroundColor: activeColors.surface,
              },
            ]}
          >
            <View style={styles.row}>
              <View style={styles.noteIcon}>
                <View style={styles.noteIconLine} />
                <View style={styles.noteIconLineShort} />
              </View>

              <View style={styles.rowContent}>
                <Text style={[styles.rowTitle, { color: activeColors.text }]}>
                  Notas
                </Text>
                <Text style={[styles.rowText, { color: activeColors.textMuted }]}>
                  Sin notas
                </Text>
              </View>

              <Text style={[styles.rowArrow, { color: activeColors.textMuted }]}>
                ›
              </Text>
            </View>
          </View>

          <Text style={[styles.createdText, { color: activeColors.textMuted }]}>
            Creada el {new Date(task.createdAt).toLocaleDateString('es-ES')}
          </Text>

          <Pressable style={styles.secondaryActionButton} onPress={handleEdit}>
            <Text style={styles.secondaryActionButtonText}>Editar tarea</Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              void handleToggle();
            }}
          >
            <Text style={styles.primaryButtonText}>
              {task.isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
            </Text>
          </Pressable>

          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Eliminar tarea</Text>
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
  description: {
    marginTop: spacing.md,
    fontSize: 17,
    lineHeight: 26,
  },
  statusPill: {
    alignSelf: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.light.surfaceSoft,
  },
  statusPillText: {
    color: colors.brand.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  progressBlock: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  checkRing: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 86,
    height: 86,
    borderWidth: 4,
    borderRadius: radius.full,
  },
  checkIcon: {
    color: colors.brand.primary,
    fontSize: 32,
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
  infoCard: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.xl,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  clockIcon: {
    position: 'relative',
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: radius.full,
    borderColor: colors.brand.primary,
  },
  clockHandVertical: {
    position: 'absolute',
    left: 9,
    top: 4,
    width: 2,
    height: 7,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  clockHandHorizontal: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 6,
    height: 2,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  noteIcon: {
    justifyContent: 'center',
    gap: 4,
    width: 22,
    height: 22,
    paddingHorizontal: 4,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: colors.brand.primary,
  },
  noteIconLine: {
    height: 2,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  noteIconLineShort: {
    width: 8,
    height: 2,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  rowText: {
    marginTop: 2,
    fontSize: 12,
  },
  rowArrow: {
    fontSize: 24,
    fontWeight: '300',
  },
  createdText: {
    marginTop: spacing.lg,
    fontSize: 12,
    textAlign: 'center',
  },
  secondaryActionButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  secondaryActionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  primaryButton: {
    alignItems: 'center',
    marginTop: spacing.md,
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
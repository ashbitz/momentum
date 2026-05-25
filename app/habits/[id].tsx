import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const habit = useMomentumStore((state) =>
    state.habits.find((currentHabit) => currentHabit.id === id),
  );
  const deleteHabit = useMomentumStore((state) => state.deleteHabit);

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
            deleteHabit(habit.id);
            router.replace('/(tabs)/habits');
          },
        },
      ],
    );
  };

  if (!habit) {
    return (
      <>
        <Stack.Screen options={{ title: 'Hábito' }} />

        <View style={styles.container}>
          <Text style={styles.title}>Hábito no encontrado</Text>
          <Text style={styles.description}>
            Este hábito no existe o ya ha sido eliminado.
          </Text>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.replace('/(tabs)/habits')}
          >
            <Text style={styles.secondaryButtonText}>Volver a hábitos</Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: habit.title }} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={[styles.colorDot, { backgroundColor: habit.color }]} />
          <Text style={styles.title}>{habit.title}</Text>
        </View>

        {habit.description ? (
          <Text style={styles.description}>{habit.description}</Text>
        ) : null}

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Objetivo diario</Text>
          <Text style={styles.cardValue}>
            {habit.targetValue} {habit.unit}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Registros</Text>
          <Text style={styles.cardValue}>{habit.logs.length} días</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Creado</Text>
          <Text style={styles.cardValue}>
            {new Date(habit.createdAt).toLocaleDateString('es-ES')}
          </Text>
        </View>

        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Eliminar hábito</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: radius.full,
  },
  title: {
    flex: 1,
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
  deleteButton: {
    alignItems: 'center',
    marginTop: spacing.xl,
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
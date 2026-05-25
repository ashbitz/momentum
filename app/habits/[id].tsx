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

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors: activeColors } = useAppTheme();

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
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

        <View
          style={[
            styles.container,
            { backgroundColor: activeColors.background },
          ]}
        >
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
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: habit.title }} />

      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: activeColors.background },
        ]}
      >
        <View style={styles.header}>
          <View style={[styles.colorDot, { backgroundColor: habit.color }]} />
          <Text style={[styles.title, { color: activeColors.text }]}>
            {habit.title}
          </Text>
        </View>

        {habit.description ? (
          <Text style={[styles.description, { color: activeColors.textMuted }]}>
            {habit.description}
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
            Objetivo diario
          </Text>
          <Text style={[styles.cardValue, { color: activeColors.text }]}>
            {habit.targetValue} {habit.unit}
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
            Registros
          </Text>
          <Text style={[styles.cardValue, { color: activeColors.text }]}>
            {habit.logs.length} días
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
            Creado
          </Text>
          <Text style={[styles.cardValue, { color: activeColors.text }]}>
            {new Date(habit.createdAt).toLocaleDateString('es-ES')}
          </Text>
        </View>

        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={[styles.deleteButtonText, { color: activeColors.text }]}>
            Eliminar hábito
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
  deleteButton: {
    alignItems: 'center',
    marginTop: spacing.xl,
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

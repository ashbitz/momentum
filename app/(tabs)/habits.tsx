import { StyleSheet, Text, View } from 'react-native';

import { HabitCard } from '@/components/items/HabitCard';
import { colors, spacing } from '@/constants/theme';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function HabitsScreen() {
  const habits = useMomentumStore((state) => state.habits);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hábitos</Text>
      <Text style={styles.description}>
        Seguimiento visual, rachas y progreso diario.
      </Text>

      <View style={styles.list}>
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
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
import { FlashList } from '@shopify/flash-list';
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

      <View style={styles.listContainer}>
        <FlashList
          data={habits}
          keyExtractor={(habit) => habit.id}
          renderItem={({ item }) => <HabitCard habit={item} />}
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
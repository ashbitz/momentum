import { router } from 'expo-router';
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
          renderItem={({ item }) => (
            <HabitCard
              habit={item}
              onPress={() => {
                router.push({
                  pathname: '/habits/[id]',
                  params: { id: item.id },
                });
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Aún no hay hábitos</Text>
              <Text style={styles.emptyDescription}>
                Crea tu primer hábito para empezar a registrar tu progreso diario.
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
  emptyContainer: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: 16,
    backgroundColor: colors.dark.surface,
  },
  emptyTitle: {
    color: colors.dark.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyDescription: {
    marginTop: spacing.sm,
    color: colors.dark.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
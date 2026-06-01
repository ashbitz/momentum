import { useEffect } from 'react';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { HabitCard } from '@/components/items/HabitCard';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function HabitsScreen() {
  const { colors: activeColors } = useAppTheme();
  const habits = useMomentumStore((state) => state.habits);
  const isLoading = useMomentumStore((state) => state.isLoading);
  const error = useMomentumStore((state) => state.error);
  const fetchHabits = useMomentumStore((state) => state.fetchHabits);

  useEffect(() => {
    void fetchHabits();
  }, [fetchHabits]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: activeColors.background },
      ]}
    >
      <Text style={[styles.title, { color: activeColors.text }]}>Hábitos</Text>
      <Text style={[styles.description, { color: activeColors.textMuted }]}>
        Seguimiento visual, rachas y progreso diario.
      </Text>

      {error ? (
        <View
          style={[
            styles.feedbackContainer,
            {
              borderColor: activeColors.border,
              backgroundColor: activeColors.surface,
            },
          ]}
        >
          <Text style={[styles.feedbackText, { color: activeColors.text }]}>
            {error}
          </Text>
        </View>
      ) : null}

      {isLoading && habits.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
          <Text style={[styles.loadingText, { color: activeColors.textMuted }]}>
            Cargando hábitos...
          </Text>
        </View>
      ) : (
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
                  Aún no hay hábitos
                </Text>
                <Text
                  style={[
                    styles.emptyDescription,
                    { color: activeColors.textMuted },
                  ]}
                >
                  Crea tu primer hábito para empezar a registrar tu progreso diario.
                </Text>
              </View>
            }
          />
        </View>
      )}
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
  feedbackContainer: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: 16,
  },
  feedbackText: {
    fontSize: 14,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: spacing.sm,
    fontSize: 14,
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
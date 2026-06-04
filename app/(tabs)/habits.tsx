import { useEffect } from 'react';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { HabitCard } from '@/components/items/HabitCard';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors, radius, spacing } from '@/constants/theme';
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
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={[styles.title, { color: activeColors.text }]}>Hábitos</Text>
        <Text style={[styles.description, { color: activeColors.textMuted }]}>
          Seguimiento visual, rachas y progreso diario.
        </Text>
      </View>

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
          <ActivityIndicator color={colors.brand.primary} />
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

      <Pressable
        style={styles.fab}
        onPress={() => {
          router.push('/new-item');
        }}
      >
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  description: {
    maxWidth: 320,
    marginTop: spacing.sm,
    fontSize: 16,
    lineHeight: 24,
  },
  feedbackContainer: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.xl,
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
    borderRadius: radius.xl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptyDescription: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    width: 58,
    height: 58,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 6,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
  },
});

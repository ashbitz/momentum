import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, Text, View } from 'react-native';

import { NoteCard } from '@/components/items/NoteCard';
import { spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function NotesScreen() {
  const { colors: activeColors } = useAppTheme();
  const notes = useMomentumStore((state) => state.notes);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: activeColors.background },
      ]}
    >
      <Text style={[styles.title, { color: activeColors.text }]}>Notas</Text>
      <Text style={[styles.description, { color: activeColors.textMuted }]}>
        Guarda ideas rápidas, reflexiones o apuntes personales.
      </Text>

      <View style={styles.listContainer}>
        <FlashList
          data={notes}
          keyExtractor={(note) => note.id}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onPress={() => {
                router.push({
                  pathname: '/notes/[id]',
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
                Todavía no hay notas
              </Text>
              <Text
                style={[
                  styles.emptyDescription,
                  { color: activeColors.textMuted },
                ]}
              >
                Guarda una idea rápida, un recordatorio o cualquier apunte personal.
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
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.sm,
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

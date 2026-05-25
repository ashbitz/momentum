import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, Text, View } from 'react-native';

import { NoteCard } from '@/components/items/NoteCard';
import { colors, spacing } from '@/constants/theme';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function NotesScreen() {
  const notes = useMomentumStore((state) => state.notes);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas</Text>
      <Text style={styles.description}>
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
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Todavía no hay notas</Text>
              <Text style={styles.emptyDescription}>
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
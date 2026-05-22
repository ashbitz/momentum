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
          renderItem={({ item }) => <NoteCard note={item} />}
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
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

      <View style={styles.list}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
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
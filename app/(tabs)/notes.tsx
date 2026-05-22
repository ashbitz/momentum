import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
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
          <View key={note.id} style={styles.card}>
            <View style={[styles.colorBar, { backgroundColor: note.color }]} />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{note.title}</Text>
              <Text style={styles.cardDescription}>{note.content}</Text>
            </View>
          </View>
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
  card: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: radius.lg,
    backgroundColor: colors.dark.surface,
  },
  colorBar: {
    height: 5,
  },
  cardContent: {
    padding: spacing.md,
  },
  cardTitle: {
    color: colors.dark.text,
    fontSize: 18,
    fontWeight: '700',
  },
  cardDescription: {
    marginTop: spacing.xs,
    color: colors.dark.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
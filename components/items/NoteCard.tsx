import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import type { Note } from '@/types';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.colorBar, { backgroundColor: note.color }]} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{note.title}</Text>
        <Text style={styles.cardDescription}>{note.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
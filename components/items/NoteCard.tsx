import { Pressable, StyleSheet, Text, View } from 'react-native';

import { radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import type { Note } from '@/types';

interface NoteCardProps {
  note: Note;
  onPress?: () => void;
}

export function NoteCard({ note, onPress }: NoteCardProps) {
  const { colors: activeColors } = useAppTheme();

  return (
    <Pressable
      style={[
        styles.card,
        {
          borderColor: activeColors.border,
          backgroundColor: activeColors.surface,
        },
      ]}
      onPress={onPress}
    >
      <View style={[styles.colorBar, { backgroundColor: note.color }]} />

      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: activeColors.text }]}>
          {note.title}
        </Text>
        <Text
          style={[
            styles.cardDescription,
            { color: activeColors.textMuted },
          ]}
        >
          {note.content}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  colorBar: {
    height: 5,
  },
  cardContent: {
    padding: spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardDescription: {
    marginTop: spacing.xs,
    fontSize: 14,
    lineHeight: 20,
  },
});

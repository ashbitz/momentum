import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import type { Note } from '@/types';

interface NoteCardProps {
  note: Note;
  onPress?: () => void;
}

export function NoteCard({ note, onPress }: NoteCardProps) {
  const { colors: activeColors } = useAppTheme();
  const noteColor = note.color ?? colors.brand.primary;

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
      <View style={[styles.colorStrip, { backgroundColor: noteColor }]} />

      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: activeColors.text }]}>
          {note.title}
        </Text>

        <Text
          style={[styles.cardDescription, { color: activeColors.textMuted }]}
          numberOfLines={3}
        >
          {note.content || 'Sin contenido adicional.'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    overflow: 'hidden',
    padding: spacing.md,
    paddingLeft: spacing.lg,
    borderWidth: 1,
    borderRadius: radius.xl,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  colorStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  cardDescription: {
    marginTop: spacing.xs,
    fontSize: 13,
    lineHeight: 19,
  },
});

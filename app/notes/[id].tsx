import { router, Stack, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { useMomentumStore } from '@/store/useMomentumStore';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors: activeColors } = useAppTheme();

  const note = useMomentumStore((state) =>
    state.notes.find((currentNote) => currentNote.id === id),
  );
  const deleteNote = useMomentumStore((state) => state.deleteNote);

  const handleDelete = () => {
    if (!note) {
      return;
    }

    Alert.alert(
      'Eliminar nota',
      `¿Seguro que quieres eliminar "${note.title}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            deleteNote(note.id);
            router.replace('/(tabs)/notes');
          },
        },
      ],
    );
  };

  if (!note) {
    return (
      <>
        <Stack.Screen options={{ title: 'Nota' }} />

        <View
          style={[
            styles.container,
            { backgroundColor: activeColors.background },
          ]}
        >
          <Text style={[styles.title, { color: activeColors.text }]}>
            Nota no encontrada
          </Text>
          <Text style={[styles.description, { color: activeColors.textMuted }]}>
            Esta nota no existe o ya ha sido eliminada.
          </Text>

          <Pressable
            style={[
              styles.secondaryButton,
              { backgroundColor: activeColors.surface },
            ]}
            onPress={() => router.replace('/(tabs)/notes')}
          >
            <Text
              style={[
                styles.secondaryButtonText,
                { color: activeColors.text },
              ]}
            >
              Volver a notas
            </Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: note.title }} />

      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: activeColors.background },
        ]}
      >
        <View style={[styles.colorBar, { backgroundColor: note.color }]} />

        <Text style={[styles.title, { color: activeColors.text }]}>
          {note.title}
        </Text>
        <Text style={[styles.description, { color: activeColors.textMuted }]}>
          {note.content}
        </Text>

        <View
          style={[
            styles.card,
            {
              borderColor: activeColors.border,
              backgroundColor: activeColors.surface,
            },
          ]}
        >
          <Text style={[styles.cardLabel, { color: activeColors.textMuted }]}>
            Creada
          </Text>
          <Text style={[styles.cardValue, { color: activeColors.text }]}>
            {new Date(note.createdAt).toLocaleDateString('es-ES')}
          </Text>
        </View>

        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={[styles.deleteButtonText, { color: activeColors.text }]}>
            Eliminar nota
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  colorBar: {
    width: 80,
    height: 6,
    marginBottom: spacing.md,
    borderRadius: radius.full,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.md,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardValue: {
    marginTop: spacing.xs,
    fontSize: 18,
    fontWeight: '700',
  },
  deleteButton: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.feedback.error,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});

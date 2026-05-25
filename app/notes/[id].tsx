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
import { useMomentumStore } from '@/store/useMomentumStore';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

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

        <View style={styles.container}>
          <Text style={styles.title}>Nota no encontrada</Text>
          <Text style={styles.description}>
            Esta nota no existe o ya ha sido eliminada.
          </Text>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.replace('/(tabs)/notes')}
          >
            <Text style={styles.secondaryButtonText}>Volver a notas</Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: note.title }} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.colorBar, { backgroundColor: note.color }]} />

        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.description}>{note.content}</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Creada</Text>
          <Text style={styles.cardValue}>
            {new Date(note.createdAt).toLocaleDateString('es-ES')}
          </Text>
        </View>

        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Eliminar nota</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.lg,
    backgroundColor: colors.dark.background,
  },
  colorBar: {
    width: 80,
    height: 6,
    marginBottom: spacing.md,
    borderRadius: radius.full,
  },
  title: {
    color: colors.dark.text,
    fontSize: 30,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.md,
    color: colors.dark.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: radius.lg,
    backgroundColor: colors.dark.surface,
  },
  cardLabel: {
    color: colors.dark.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  cardValue: {
    marginTop: spacing.xs,
    color: colors.dark.text,
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
    color: colors.dark.text,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.dark.surface,
  },
  secondaryButtonText: {
    color: colors.dark.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
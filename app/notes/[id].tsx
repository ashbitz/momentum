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

import { ScreenContainer } from '@/components/layout/ScreenContainer';
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

  const handleConfirmDelete = async () => {
    if (!note) {
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await deleteNote(note.id);
    router.replace('/(tabs)/notes');
  };

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
            void handleConfirmDelete();
          },
        },
      ],
    );
  };

  if (!note) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />

        <ScreenContainer>
          <View style={styles.emptyState}>
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
        </ScreenContainer>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScreenContainer withHorizontalPadding={false}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.topBarIcon}>‹</Text>
            </Pressable>

            <Text style={[styles.topBarTitle, { color: activeColors.text }]}>
              Nota
            </Text>

            <Text style={[styles.topBarIcon, { color: activeColors.textMuted }]}>
              ⋯
            </Text>
          </View>

          <Text style={[styles.title, { color: activeColors.text }]}>
            {note.title}
          </Text>

          <View
            style={[
              styles.contentCard,
              {
                borderColor: activeColors.border,
                backgroundColor: activeColors.surface,
              },
            ]}
          >
            <Text style={[styles.description, { color: activeColors.textMuted }]}>
              {note.content || 'Sin contenido adicional.'}
            </Text>
          </View>

          <Text style={[styles.createdText, { color: activeColors.textMuted }]}>
            Creada el {new Date(note.createdAt).toLocaleDateString('es-ES')}
          </Text>

          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Editar nota</Text>
          </Pressable>

          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Eliminar nota</Text>
          </Pressable>
        </ScrollView>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  topBarIcon: {
    color: colors.brand.primary,
    fontSize: 26,
    fontWeight: '800',
  },
  topBarTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  contentCard: {
    minHeight: 180,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderRadius: radius.xl,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  createdText: {
    marginTop: spacing.lg,
    fontSize: 12,
    textAlign: 'center',
  },
  primaryButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  deleteButton: {
    alignItems: 'center',
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    backgroundColor: '#FDE7E4',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '800',
  },
});
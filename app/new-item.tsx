import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';

export default function NewItemScreen() {
  return (
    <>
      <Stack.Screen options={{ presentation: 'modal', title: 'Nuevo elemento' }} />

      <View style={styles.container}>
        <Text style={styles.kicker}>Crear</Text>
        <Text style={styles.title}>Nuevo elemento</Text>
        <Text style={styles.description}>
          Aquí se creará el formulario para añadir hábitos, tareas o notas.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Formulario pendiente</Text>
          <Text style={styles.cardText}>
            En el siguiente paso añadiremos selección de tipo y validación con Zod.
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.dark.background,
  },
  kicker: {
    color: colors.brand.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    marginTop: spacing.sm,
    color: colors.dark.text,
    fontSize: 32,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.sm,
    color: colors.dark.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: radius.lg,
    backgroundColor: colors.dark.surface,
  },
  cardTitle: {
    color: colors.dark.text,
    fontSize: 18,
    fontWeight: '700',
  },
  cardText: {
    marginTop: spacing.sm,
    color: colors.dark.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
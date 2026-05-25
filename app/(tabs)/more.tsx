import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

export default function MoreScreen() {
  const {
    colors: activeColors,
    themeMode,
    toggleTheme,
  } = useAppTheme();
  const isDarkMode = themeMode === 'dark';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: activeColors.background },
      ]}
    >
      <Text style={[styles.title, { color: activeColors.text }]}>Más</Text>

      <Text style={[styles.description, { color: activeColors.textMuted }]}>
        Ajustes generales de Momentum y opciones preparadas para futuras mejoras.
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
        <Text style={[styles.cardTitle, { color: activeColors.text }]}>
          Tema de la aplicación
        </Text>

        <Text style={[styles.cardText, { color: activeColors.textMuted }]}>
          Momentum utiliza el modo oscuro por defecto. Puedes cambiar entre modo
          claro y oscuro sin afectar tus hábitos, tareas ni notas.
        </Text>

        <Pressable
          style={[
            styles.statusPill,
            { backgroundColor: activeColors.surfaceSoft },
          ]}
          accessibilityRole="button"
          onPress={toggleTheme}
        >
          <Text style={[styles.statusText, { color: activeColors.text }]}>
            Modo activo: {isDarkMode ? 'Oscuro' : 'Claro'}
          </Text>

          <Text style={[styles.statusActionText, { color: colors.brand.primary }]}>
            Cambiar a modo {isDarkMode ? 'claro' : 'oscuro'}
          </Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.card,
          {
            borderColor: activeColors.border,
            backgroundColor: activeColors.surface,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: activeColors.text }]}>
          Estado del proyecto
        </Text>

        <Text style={[styles.cardText, { color: activeColors.textMuted }]}>
          La versión actual prioriza las funcionalidades principales del ejercicio:
          creación, validación, persistencia local, navegación, detalle, haptics,
          estados vacíos y eliminación de elementos.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    marginTop: spacing.sm,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardText: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 22,
  },
  statusPill: {
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
  },
  statusActionText: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '700',
  },
});

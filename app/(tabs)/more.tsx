import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
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
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={[styles.title, { color: activeColors.text }]}>Más</Text>
        <Text style={[styles.description, { color: activeColors.textMuted }]}>Ajustes generales de Momentum.</Text>
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
        <Text style={[styles.cardTitle, { color: activeColors.text }]}>Tema de la aplicación</Text>

        <Text style={[styles.cardText, { color: activeColors.textMuted }]}>Puedes cambiar entre modo claro y oscuro sin afectar tus hábitos, tareas ni notas.</Text>

        <Pressable
          style={[styles.statusPill, { backgroundColor: activeColors.surfaceSoft }]}
          accessibilityRole="button"
          onPress={toggleTheme}
        >
          <Text style={[styles.statusText, { color: activeColors.text }]}>Modo activo: {isDarkMode ? 'Oscuro' : 'Claro'}</Text>
          <Text style={[styles.statusActionText, { color: colors.brand.primary }]}>Cambiar a modo {isDarkMode ? 'claro' : 'oscuro'}</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  description: {
    maxWidth: 320,
    marginTop: spacing.sm,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderRadius: radius.xl,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  cardText: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 22,
  },
  statusPill: {
    alignSelf: 'flex-start',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '800',
  },
  statusActionText: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '800',
  },
});

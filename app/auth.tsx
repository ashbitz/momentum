import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors, radius, spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useAppTheme } from '@/context/ThemeContext';

type AuthMode = 'login' | 'register';

function MomentumLogo() {
  return (
    <View style={styles.logoWrapper}>
      <Svg width={58} height={34} viewBox="0 0 58 34" fill="none">
        <Path
          d="M7 27L19 7"
          stroke={colors.brand.primary}
          strokeWidth={7}
          strokeLinecap="round"
        />
        <Path
          d="M24 27L36 7"
          stroke={colors.brand.accent}
          strokeWidth={7}
          strokeLinecap="round"
          opacity={0.78}
        />
        <Path
          d="M41 27L53 7"
          stroke={colors.brand.primary}
          strokeWidth={7}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

function HeroIllustration() {
  return (
    <View style={styles.heroIllustration}>
      <Svg width={230} height={230} viewBox="0 0 230 230" fill="none">
        <Circle
          cx={142}
          cy={96}
          r={78}
          stroke={colors.brand.primary}
          strokeOpacity={0.12}
          strokeWidth={2}
        />
        <Circle
          cx={142}
          cy={96}
          r={51}
          stroke={colors.brand.primary}
          strokeOpacity={0.14}
          strokeWidth={2}
        />
        <Circle
          cx={142}
          cy={96}
          r={28}
          stroke={colors.brand.primary}
          strokeOpacity={0.16}
          strokeWidth={2}
        />
        <Circle
          cx={142}
          cy={96}
          r={14}
          fill={colors.brand.primary}
          fillOpacity={0.13}
        />

        <Path
          d="M4 178C38 176 64 160 86 140C104 123 116 112 126 105"
          stroke={colors.brand.primary}
          strokeOpacity={0.34}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="6 8"
        />

        <Path
          d="M142 96L101 112C99.3 112.7 99.4 115.1 101.2 115.6L119.5 121L125 139.4C125.5 141.2 128 141.3 128.7 139.6L142 96Z"
          fill={colors.brand.primary}
        />
        <Path
          d="M119.5 121L142 96L125 139.4L119.5 121Z"
          fill={colors.brand.accent}
          opacity={0.9}
        />
        <Path
          d="M101 112L142 96L119.5 121L101 112Z"
          fill="#5EEAD4"
          opacity={0.95}
        />
      </Svg>
    </View>
  );
}

function GoogleIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 48 48">
      <Path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5Z"
      />
      <Path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7Z"
      />
      <Path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.4 39.6 16.2 44 24 44Z"
      />
      <Path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C36.9 39.3 44 34 44 24c0-1.3-.1-2.3-.4-3.5Z"
      />
    </Svg>
  );
}

export default function AuthScreen() {
  const router = useRouter();
  const { colors: activeColors } = useAppTheme();
  const { login, register } = useAuth();

  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegisterMode = authMode === 'register';

  async function handleSubmit() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (isRegisterMode && !trimmedName) {
      Alert.alert('Nombre requerido', 'Introduce tu nombre para crear la cuenta.');
      return;
    }

    if (!trimmedEmail || !password) {
      Alert.alert('Campos incompletos', 'Introduce correo y contraseña.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (isRegisterMode) {
        await register({
          name: trimmedName,
          email: trimmedEmail,
          password,
        });
      } else {
        await login({
          email: trimmedEmail,
          password,
        });
      }

      router.replace('/');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'No se ha podido completar la acción.';

      Alert.alert('Error de autenticación', message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function toggleMode() {
    setAuthMode((currentMode) =>
      currentMode === 'login' ? 'register' : 'login',
    );
  }

  function handleGooglePress() {
    Alert.alert(
      'Google todavía no está activo',
      'Primero dejaremos cerrado el flujo principal con correo y contraseña.',
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: activeColors.background }]}
      edges={['top', 'bottom']}
    >
      <LinearGradient
        colors={[
          activeColors.background,
          activeColors.surfaceSoft,
          activeColors.background,
        ]}
        locations={[0, 0.48, 1]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <HeroIllustration />

            <View style={styles.logoRow}>
              <MomentumLogo />
              <Text style={styles.logoText}>Momentum</Text>
            </View>

            <View style={styles.hero}>
              <Text style={[styles.heroTitle, { color: activeColors.text }]}>
                Enfócate.
              </Text>
              <Text style={[styles.heroTitle, { color: activeColors.text }]}>
                Organiza.
              </Text>
              <Text style={[styles.heroTitle, styles.heroTitleAccent]}>
                Avanza.
              </Text>

              <Text
                style={[styles.heroDescription, { color: activeColors.textMuted }]}
              >
                {isRegisterMode
                  ? 'Crea tu cuenta para empezar a impulsar tus metas.'
                  : 'Inicia sesión para seguir impulsando tus metas.'}
              </Text>
            </View>

            <View
              style={[
                styles.authCard,
                {
                  borderColor: activeColors.border,
                  backgroundColor: activeColors.surface,
                },
              ]}
            >
              {isRegisterMode ? (
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Nombre"
                  placeholderTextColor={activeColors.textMuted}
                  style={[
                    styles.input,
                    {
                      borderColor: activeColors.border,
                      color: activeColors.text,
                      backgroundColor: activeColors.background,
                    },
                  ]}
                  autoCapitalize="words"
                  editable={!isSubmitting}
                />
              ) : null}

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Correo electrónico"
                placeholderTextColor={activeColors.textMuted}
                style={[
                  styles.input,
                  {
                    borderColor: activeColors.border,
                    color: activeColors.text,
                    backgroundColor: activeColors.background,
                  },
                ]}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                editable={!isSubmitting}
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Contraseña"
                placeholderTextColor={activeColors.textMuted}
                style={[
                  styles.input,
                  {
                    borderColor: activeColors.border,
                    color: activeColors.text,
                    backgroundColor: activeColors.background,
                  },
                ]}
                secureTextEntry
                editable={!isSubmitting}
              />

              {!isRegisterMode ? (
                <Pressable
                  style={styles.forgotButton}
                  onPress={() => {
                    Alert.alert(
                      'Recuperar contraseña',
                      'Lo añadiremos después si hace falta para la entrega.',
                    );
                  }}
                >
                  <Text style={styles.forgotText}>
                    ¿Has olvidado tu contraseña?
                  </Text>
                </Pressable>
              ) : null}

              <Pressable
                style={[
                  styles.primaryButton,
                  isSubmitting && styles.primaryButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    {isRegisterMode ? 'Crear cuenta' : 'Iniciar sesión'}
                  </Text>
                )}
              </Pressable>

              {!isRegisterMode ? (
                <>
                  <View style={styles.dividerRow}>
                    <View
                      style={[
                        styles.dividerLine,
                        { backgroundColor: activeColors.border },
                      ]}
                    />
                    <Text
                      style={[
                        styles.dividerText,
                        { color: activeColors.textMuted },
                      ]}
                    >
                      o
                    </Text>
                    <View
                      style={[
                        styles.dividerLine,
                        { backgroundColor: activeColors.border },
                      ]}
                    />
                  </View>

                  <Pressable
                    style={[
                      styles.googleButton,
                      {
                        borderColor: activeColors.border,
                        backgroundColor: activeColors.background,
                      },
                    ]}
                    onPress={handleGooglePress}
                  >
                    <GoogleIcon />
                    <Text
                      style={[
                        styles.googleButtonText,
                        { color: activeColors.text },
                      ]}
                    >
                      Continuar con Google
                    </Text>
                  </Pressable>
                </>
              ) : null}
            </View>

            <Pressable style={styles.modeButton} onPress={toggleMode}>
              <Text style={[styles.modeText, { color: activeColors.textMuted }]}>
                {isRegisterMode ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
              </Text>
              <Text style={styles.modeActionText}>
                {isRegisterMode ? ' Iniciar sesión' : ' Crear cuenta'}
              </Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  heroIllustration: {
    position: 'absolute',
    top: 28,
    right: -14,
    width: 230,
    height: 230,
  },
  logoRow: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  logoWrapper: {
    width: 58,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.brand.primary,
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  hero: {
    zIndex: 1,
    marginTop: spacing.xl,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 44,
    letterSpacing: -1,
  },
  heroTitleAccent: {
    color: colors.brand.primary,
  },
  heroDescription: {
    maxWidth: 260,
    marginTop: spacing.md,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '500',
  },
  authCard: {
    zIndex: 1,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderRadius: 28,
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.11,
    shadowRadius: 28,
    elevation: 4,
  },
  input: {
    minHeight: 54,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
    fontSize: 15,
    fontWeight: '600',
  },
  forgotButton: {
    alignSelf: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  forgotText: {
    color: colors.brand.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  primaryButton: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.brand.primary,
    shadowColor: colors.brand.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: '800',
  },
  googleButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: '900',
  },
  modeButton: {
    zIndex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: spacing.xl,
    paddingVertical: spacing.sm,
  },
  modeText: {
    fontSize: 15,
    fontWeight: '700',
  },
  modeActionText: {
    color: colors.brand.primary,
    fontSize: 15,
    fontWeight: '900',
  },
});
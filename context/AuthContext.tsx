import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: FirebaseAuthTypes.User | null;
  isAuthLoading: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getAuthErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = String(error.code);

    if (code === 'auth/email-already-in-use') {
      return 'Este correo ya está registrado.';
    }

    if (code === 'auth/invalid-email') {
      return 'El correo no tiene un formato válido.';
    }

    if (code === 'auth/weak-password') {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (code === 'auth/invalid-credential') {
      return 'El correo o la contraseña no son correctos.';
    }
  }

  return 'No se ha podido completar la acción. Inténtalo de nuevo.';
}

function getWebAuthMessage() {
  return 'La autenticación con React Native Firebase necesita una build nativa. En web podemos revisar la pantalla, pero el login real se probará con Development Build.';
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setIsAuthLoading(false);
      return undefined;
    }

    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  async function register({ name, email, password }: RegisterData) {
    if (Platform.OS === 'web') {
      throw new Error(getWebAuthMessage());
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password);
      const userId = userCredential.user.uid;

      await firestore().collection('users').doc(userId).set({
        name: name.trim(),
        email: email.trim(),
        bio: '',
        avatarUrl: null,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  }

  async function login({ email, password }: LoginData) {
    if (Platform.OS === 'web') {
      throw new Error(getWebAuthMessage());
    }

    try {
      await auth().signInWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  }

  async function logout() {
    if (Platform.OS === 'web') {
      setUser(null);
      return;
    }

    await auth().signOut();
  }

  const value = useMemo(
    () => ({
      user,
      isAuthLoading,
      register,
      login,
      logout,
    }),
    [user, isAuthLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
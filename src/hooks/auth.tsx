import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, UserCredential, User as firebaseUser} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../services/firebase';
import Toast from 'react-native-toast-message';

type User = firebaseUser;

type AuthContextType = {
  user: User | undefined;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          await AsyncStorage.setItem('user', JSON.stringify(firebaseUser));
        } catch (error) {
          console.error('Erro ao salvar usuário no AsyncStorage:', error);
        }
      } else {
        await checkStoredUser();
      }
    });

    return () => unsubscribe();
  }, []);

  const checkStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao recuperar usuário do AsyncStorage:', error);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const credentials: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = credentials.user;

      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          await AsyncStorage.setItem('user', JSON.stringify(firebaseUser));
        } catch (error) {
          console.error('Erro ao salvar usuário no AsyncStorage:', error);
        }
      }

      return true;
    } catch (error) {
      handleAuthError(error);
      return false;
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      handleAuthError(error);
      return false;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem('user');
      setUser(undefined);
      console.log("SignOut");
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleAuthError = (error: any) => {
    const errorCode = error.code;
    console.log({ errorCode });

    if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
      Toast.show({
        type: 'error',
        text1: 'ATENÇÃO',
        text2: 'EMAIL OU SENHA INVÁLIDOS.⚠️',
      });
    }

    const errorMessage = error.message;

    if (errorMessage) {
      Toast.show({
        type: 'error',
        text1: 'ATENÇÃO',
        text2: 'NÃO FOI POSSÍVEL REALIZAR O LOGIN.⚠️',
      });
    }
  };

  const contextValue: AuthContextType = {
    user,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

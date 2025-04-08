import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definimos la interfaz para el estado
interface AuthStore {
  userName: string | null;
  email: string | null;
  setUserName: (name: string) => void;
  setEmail: (email: string) => void;
  logout: () => void;  // Función para limpiar los datos
}

// Creamos el store con persistencia
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userName: null,
      email: null,
      setUserName: (name) => set({ userName: name }),
      setEmail: (email) => set({ email }),
      logout: () => set({ userName: null, email: null }),
    }),
    {
      name: 'auth-storage', // Nombre en AsyncStorage
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);

// Hook personalizado para acceder al estado
export const useAuth = () => {
  const { userName, email, setUserName, setEmail, logout } = useAuthStore();
  return { userName, email, setUserName, setEmail, logout };
};

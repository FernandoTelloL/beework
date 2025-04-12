import { create } from 'zustand';

// Definimos la interfaz para el estado
interface LoginStore {
  email: string | null;
  password: string | null;
  isAuthenticated: boolean;
  token: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setisAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

// Creamos el store de Zustand
const useLoginStore = create<LoginStore>((set) => ({
  email: null,
  password: null,
  isAuthenticated: false,
  token: null,

  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  setToken: (token) => {
    set({ token });
    // Aquí puedes agregar lógica adicional para manejar el token
    // como guardarlo en el almacenamiento local o realizar una llamada a la API.
    // Por ejemplo: 
    // localStorage.setItem('userToken', token);
    // o
    // await api.setToken(token);
    // router.push('/home'); // Redirigir a la página de inicio
    // router.push('/(stack)/home');
  },

  setisAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  logout: () => {
    set({ isAuthenticated: false });
    // Aquí puedes agregar lógica adicional para manejar el cierre de sesión
    // como limpiar el almacenamiento local o realizar una llamada a la API.
    // Por ejemplo:
    // localStorage.removeItem('userToken');
    // o
    // await api.logout();
    // router.push('/login'); // Redirigir a la página de inicio de sesión
    // router.push('/(stack)/login');
  },


}));

export default useLoginStore;
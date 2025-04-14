import { create } from 'zustand';

// Definimos la interfaz para el estado
interface UserProfileStore {
  userId: string | null;
  setUserId: (userId: string) => void;
}

// Creamos el store de Zustand
const useUserProfileStore = create<UserProfileStore>((set) => ({
  userId: null,

  setUserId: (userId: string) => set({ userId }),

}));

export default useUserProfileStore;
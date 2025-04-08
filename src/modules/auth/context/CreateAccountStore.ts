// context/CreateAccountStore.ts
import { create } from 'zustand';

interface CreateAccountStore {
  name: string | null;
  lastName: string | null;
  email: string | null;
  birthDate: Date | null;
  invitationToken: string | null;
  password: string | null;
  setPassword: (password: string) => void;
  setInvitationToken: (invitationToken: string) => void;
  setName: (name: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setBirthDate: (birthDate: Date) => void;

}

const useCreateAccountStore = create<CreateAccountStore>((set) => ({
  name: null,
  lastName: null,
  email: null,
  birthDate: null,
  invitationToken: null,
  password: null,
  setPassword: (password) => set({ password }),
  setInvitationToken: (invitationToken) => set({ invitationToken }),
  setName: (name) => set({ name }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),
  setBirthDate: (birthDate) => set({ birthDate }),
}));

export default useCreateAccountStore;

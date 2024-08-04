import { create } from 'zustand';
import { signOut } from 'next-auth/react';

type UserState = {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    isLoggedIn: boolean;
  } | null;
  logIn: (name: string, email: string, phone: string, address: string) => void;
  logOut: () => void;
  updateSession: (session: any) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  logIn: (name, email, phone, address) =>
    set(() => ({
      user: { name, email, phone, address, isLoggedIn: true },
    })),
  logOut: async () => {
    await signOut({ redirect: false });
    set(() => ({ user: null }));
    location.reload();
  },
  updateSession: (session) => {
    if (session && session.user && session.user.name) {
      set(() => ({
        user: {
          name: session.user.name,
          email: session.user.email,
          phone: session.user.phone,
          address: session.user.address,
          isLoggedIn: true,
        },
      }));
    } else {
      set(() => ({ user: null }));
    }
  },
}));

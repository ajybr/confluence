import { create } from "zustand";
import getCurrentUser from "../api/getCurrentUser";
import { AxiosError } from "axios";

type User = {
  id: string;
  username: string;
  bio: string;
};

type UserStore = {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  getUser: () => Promise<void>;
  clearUser: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  getUser: async () => {
    try {
      const user = await getCurrentUser();
      set({ user: user, loading: false });
    } catch (e) {
      if (
        typeof e === "object" &&
        e !== null &&
        "isAxiosError" in e &&
        (e as AxiosError).isAxiosError
      ) {
        const axiosError = e as AxiosError;
        if (axiosError.response?.status === 401) {
          set({ user: null, loading: false });
        } else {
          console.error("Unexpected Axios error getting user:", axiosError);
          set({ user: null, loading: false });
        }
      } else {
        console.error("Unexpected non-Axios error getting user:", e);
        set({ user: null, loading: false });
      }
    }
  },
}));

export default useUserStore;

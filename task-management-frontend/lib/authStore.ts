import { create } from "zustand";
import { api, setAuthToken } from "./api";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });

      console.log({ data });
      // ✅ Store full user object (name & email)
      const user = { name: data.name, email: data.email };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
      setAuthToken(data.token);

      set({ user, token: data.token });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Clear user data
    setAuthToken(null);
    set({ user: null, token: null });
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setAuthToken(token);
      set({ token, user: JSON.parse(storedUser) });
    }
  },
}));

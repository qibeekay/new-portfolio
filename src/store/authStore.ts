import { create } from 'zustand';

interface AuthState {
  token: string | null;
  expiresAt: string | null;
  email: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, expiresAt: string, email?: string) => void;
  clearAuth: () => void;
}

const STORAGE_KEY = 'portfolio.admin.auth';

function loadInitialAuth(): Pick<AuthState, 'token' | 'expiresAt' | 'email' | 'isAuthenticated'> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.token) {
        // Check if token is expired
        if (data.expiresAt && new Date(data.expiresAt).getTime() <= Date.now()) {
          localStorage.removeItem(STORAGE_KEY);
          return { token: null, expiresAt: null, email: null, isAuthenticated: false };
        }
        return {
          token: data.token,
          expiresAt: data.expiresAt ?? null,
          email: data.email ?? null,
          isAuthenticated: true,
        };
      }
    }
  } catch {
    // Ignore storage parse issues
  }
  return { token: null, expiresAt: null, email: null, isAuthenticated: false };
}

export const useAuthStore = create<AuthState>((set) => {
  const initial = loadInitialAuth();

  return {
    ...initial,
    setAuth: (token: string, expiresAt: string, email?: string) => {
      const authData = { token, expiresAt, email: email ?? 'admin@example.com' };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
      } catch {
        // In-memory fallback
      }
      set({
        token,
        expiresAt,
        email: email ?? 'admin@example.com',
        isAuthenticated: true,
      });
    },
    clearAuth: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore
      }
      set({
        token: null,
        expiresAt: null,
        email: null,
        isAuthenticated: false,
      });
    },
  };
});

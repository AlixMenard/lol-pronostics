const TOKEN_KEY = 'token';
const USER_KEY = 'user';

interface User {
  id: number;
  name: string;
}

export const authService = {
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  },

  login: (token: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  },

  getUser: (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
};
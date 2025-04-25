const TOKEN_KEY = 'token';
const USER_KEY = 'user';

interface User {
  id: number;
  name: string;
}

export const authService = {
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('isAuthenticated, token:', token);
    return !!token;
  },

  login: (token: string, user: User) => {
    console.log('login, token:', token);
    console.log('login, user:', user);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log('Après setItem, token stocké:', localStorage.getItem(TOKEN_KEY));
    console.log('Après setItem, user stocké:', localStorage.getItem(USER_KEY));
  },

  logout: () => {
    console.log('logout appelé');
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('getToken:', token);
    return token;
  },

  getUser: (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    console.log('getUser:', user);
    return user ? JSON.parse(user) : null;
  },
};
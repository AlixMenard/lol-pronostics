const TOKEN_KEY = 'auth_token';
const USER_ID_KEY = 'user_id';

export const auth = {
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  setUserId: (userId: number) => {
    localStorage.setItem(USER_ID_KEY, userId.toString());
  },

  getUserId: () => {
    const userId = localStorage.getItem(USER_ID_KEY);
    return userId ? parseInt(userId) : null;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  }
};

const prefix = '@neutron:';

const storageKeys = {
  token: `${prefix}token`,
};

export default {
  // Token
  setToken: (token) => localStorage.setItem(storageKeys.token, token),
  getToken: () => localStorage.getItem(storageKeys.token),
  removeToken: () => localStorage.removeItem(storageKeys.token),
};

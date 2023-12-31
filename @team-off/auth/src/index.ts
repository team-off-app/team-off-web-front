const authLocalStorageKey = 'access_token';

export const persistAccessToken = (token: string) => {
  localStorage.setItem(authLocalStorageKey, token);
};

export const resetAccessToken = () => {
  localStorage.removeItem(authLocalStorageKey);
};

export const getAccessToken = () => {
  return localStorage.getItem(authLocalStorageKey);
};

export const AUTH_TOKEN = 'auth_token';
export const REFRESH_TOKEN = 'refresh_token';

/* Let's save our user tokens so when the app resets we can try and get them later */
export const saveAuthTokenLocalStorage = ({
  accessToken,
  refreshToken
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem(AUTH_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getAuthTokenLocalStorage = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const getRefreshTokenLocalStorage = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const clearAuthTokens = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

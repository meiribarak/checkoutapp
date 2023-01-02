import React, { useState, useEffect, useCallback } from "react";

const tokenKey = "jrToken";
const expirationTimeKey = "jrTokenExpirationTime";
const refreshTokenKey = "jrRefreshToken";
let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, expirationTime, refreshToken) => {},
  logout: () => {},
});

const clearTokenData = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(expirationTimeKey);
  localStorage.removeItem(refreshTokenKey);
};

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem(tokenKey);
  const storedExpirationDate = localStorage.getItem(expirationTimeKey);

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 3600) {
    clearTokenData();
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    clearTokenData();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, refreshToken) => {
    setToken(token);
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(expirationTimeKey, expirationTime);
    localStorage.setItem(refreshTokenKey, refreshToken);

    const remainingDuration = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingDuration);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

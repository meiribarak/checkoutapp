import React, { useState, useEffect, useCallback } from "react";

const tokenKey = "jrToken";
const expirationTimeKey = "jrTokenExpirationTime";
const refreshTokenKey = "jrRefreshToken";
const storeIdKey = "jrStoreId";
let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  storeId: "",
  login: (token, expirationTime, refreshToken, storeId) => {},
  logout: () => {},
});

const clearTokenData = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(expirationTimeKey);
  localStorage.removeItem(refreshTokenKey);
  localStorage.removeItem(storeIdKey);
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
  const storedStoreId = localStorage.getItem(storeIdKey);

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 3600) {
    clearTokenData();
  }

  return {
    token: storedToken,
    duration: remainingTime,
    storeId: storedStoreId
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken, initialStoreId;

  if (tokenData) {
    initialToken = tokenData.token;
    initialStoreId = tokenData.storeId;
  }

  const [token, setToken] = useState(initialToken);
  const [storeId, setStoreId] = useState(initialStoreId);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    clearTokenData();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, refreshToken, storeId) => {
    setToken(token);
    setStoreId(storeId);
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(expirationTimeKey, expirationTime);
    localStorage.setItem(refreshTokenKey, refreshToken);
    localStorage.setItem(storeIdKey, storeId);

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
    storeId: storeId,
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

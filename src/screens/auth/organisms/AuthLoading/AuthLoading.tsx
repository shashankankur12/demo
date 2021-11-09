import React, { useEffect } from 'react';
import { Auth, Main } from 'screens/Navigation';
import useAuth from 'context/Authentication';
import { subscribe, unsubscribe } from 'utils/EventEmitter';
import { Spinner } from 'atoms/Spinner';
import { Box } from 'atoms/Box';

export const AuthLoading = () => {
  const {
    actions: { getUserFromStorage, logout, getCredentials },
    state: { isLoggedIn, authenticating, isAppLoading },
  } = useAuth();

  useEffect(() => {
    subscribe('logout', logout);
    return () => unsubscribe('logout');
  });

  useEffect(() => {
    if (!authenticating && !isLoggedIn) {
      getUserFromStorage();
      getCredentials();
    }
  }, [getUserFromStorage, authenticating, isLoggedIn, getCredentials]);

  if (isAppLoading) {
    return (
      <Box flex={1} justifyContent="center">
        <Spinner color="primary" size="large" />
      </Box>
    );
  }

  return isLoggedIn ? <Main /> : <Auth />;
};

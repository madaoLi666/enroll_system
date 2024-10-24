import { history } from '@umijs/max';
import React from 'react';

export default () => {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    const sessionStorageToken = sessionStorage.getItem('token');
    if (!sessionStorageToken) {
      history.push('/login');
    }
    setToken(sessionStorageToken as string);
  }, []);

  return {
    token,
  };
};

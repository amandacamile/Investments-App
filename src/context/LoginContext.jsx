import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const LoginContext = createContext('');

function LoginProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const updateLogin = (newLogin) => {
    setLogin(newLogin);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const loginValue = {
    login,
    updateLogin,
  };

  return (
    <LoginContext.Provider value={loginValue}>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;

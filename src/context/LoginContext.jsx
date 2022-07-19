import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const loginValue = {
    email,
    setEmail,
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

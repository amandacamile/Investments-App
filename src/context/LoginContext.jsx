import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [email, setEmail] = useState('');

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    email,
    setEmail,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const WalletContext = createContext();

function WalletProvider({ children }) {
  const [balance, setBalance] = useState(0);

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    balance,
    updateBalance,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

WalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WalletProvider;

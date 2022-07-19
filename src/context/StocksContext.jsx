import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchStocksAPI from '../services/stocksAPI';

export const StocksContext = createContext('');

function StocksProvider({ children }) {
  const [stocks, setStocks] = useState([]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    stocks,
    setStocks,
  };

  useEffect(() => {
    (
      async () => {
        const getStocks = await fetchStocksAPI();
        setStocks(getStocks);
      }
    )();
  }, []);

  return (
    <StocksContext.Provider value={contextValue}>
      {children}
    </StocksContext.Provider>
  );
}

StocksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StocksProvider;

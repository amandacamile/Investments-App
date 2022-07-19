import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchStocksAPI from '../services/stocksAPI';

export const StocksContext = createContext('');

function StocksProvider({ children }) {
  const [stocks, setStocks] = useState([]);
  const [myStocks, setMyStocks] = useState([]);

  useEffect(() => {
    setMyStocks([
      {
        AssetCode: 1, AssetName: 'SBSP3', AssetQtd: 20, Value: 43.21,
      }, {
        AssetCode: 2, AssetName: 'RECV3', AssetQtd: 18, Value: 23.1,
      }, {
        AssetCode: 3, AssetName: 'PARD3', AssetQtd: 20, Value: 20.65,
      }]);
    // exemplos só para visualização
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    stocks,
    myStocks,
    setStocks,
    setMyStocks,
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

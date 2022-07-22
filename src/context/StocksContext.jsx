import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchStocksAPI from '../services/stocksAPI';

export const StocksContext = createContext('');

function StocksProvider({ children }) {
  const [stocks, setStocks] = useState([]);
  const [myStocks, setMyStocks] = useState([]);

  const manipulateMyStocks = ({ name, value }, buyValue) => {
    const newStock = {
      AssetCode: myStocks.length + 1,
      AssetName: name,
      AssetQtd: buyValue,
      Value: value,
    };
    setMyStocks([...myStocks, newStock]);
  };

  const manipulateStocks = ({ name, value }, sellValue) => {
    const newStock = {
      AssetCode: stocks.length + 1,
      AssetName: name,
      AssetQtd: sellValue,
      Value: value,
    };
    setStocks([...stocks, newStock]);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    stocks,
    myStocks,
    manipulateStocks,
    manipulateMyStocks,
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

import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import fetchStocksAPI from '../services/stocksAPI';

export const StocksContext = createContext('');

function StocksProvider({ children }) {
  const [stocks, setStocks] = useState([]);
  const [myStocks, setMyStocks] = useState([]);

  const manipulateMyStocks = ({ name, value }, buyValue) => {
    try {
      const newStock = myStocks.find((stock) => stock.AssetName === name);

      const sumStock = {
        AssetCode: uuid(),
        AssetName: name,
        AssetQtd: newStock.AssetQtd + buyValue,
        Value: value,
      };

      const newArrStocks = myStocks.filter((elem) => elem !== newStock);
      setMyStocks([...newArrStocks, sumStock]);
    } catch (error) {
      const newStock = {
        AssetCode: uuid(),
        AssetName: name,
        AssetQtd: buyValue,
        Value: value,
      };

      setMyStocks([...myStocks, newStock]);
    }
  };

  const manipulateStocks = ({ name, value }, sellValue) => {
    try {
      const newStock = stocks.find((stock) => stock.AssetName === name);

      const sumStock = {
        AssetCode: uuid(),
        AssetName: name,
        AssetQtd: newStock.AssetQtd + sellValue,
        Value: value,
      };

      const newArrStocks = stocks.filter((elem) => elem !== newStock);
      setStocks([...newArrStocks, sumStock]);
    } catch (error) {
      const newStock = {
        AssetCode: uuid(),
        AssetName: name,
        AssetQtd: sellValue,
        Value: value,
      };

      setStocks([...stocks, newStock]);
    }
  };

  const removeMyZeroedStocks = () => {
    const stockZeroed = myStocks.find((stock) => stock.AssetQtd === 0);
    const newArrStocks = myStocks.filter((stock) => stock !== stockZeroed);

    setMyStocks(newArrStocks);
  };

  const removeZeroedStocks = () => {
    const stockZeroed = stocks.find((stock) => stock.AssetQtd === 0);
    const newArrStocks = stocks.filter((stock) => stock !== stockZeroed);

    setStocks(newArrStocks);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    stocks,
    myStocks,
    removeZeroedStocks,
    removeMyZeroedStocks,
    manipulateStocks,
    manipulateMyStocks,
  };

  useEffect(() => {
    (
      async () => {
        const getStocks = await fetchStocksAPI();
        const addId = getStocks.map((stock) => ({
          ...stock,
          AssetCode: uuid(),

        }));
        setStocks(addId);
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

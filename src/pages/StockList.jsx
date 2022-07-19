import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import MyStocksTable from '../components/MyStocksTable';
import StockTable from '../components/StockTable';

function StockList() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <MyStocksTable />
      <StockTable />
      <button
        type="button"
        onClick={() => navigate('/wallet')}
      >
        Déposito/Retirada
      </button>
    </div>
  );
}

export default StockList;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import MyStocksTable from '../components/MyStocksTable';
import StockTable from '../components/StockTable';
import { LoginContext } from '../context/LoginContext';

function StockList() {
  const { email } = useContext(LoginContext);

  const navigate = useNavigate();

  return (
    <div>
      <Header email={email} />
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

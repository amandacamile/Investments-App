import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import MyStocksTable from '../components/MyStocksTable';
import StockTable from '../components/StockTable';
import ModalBuyAndSell from '../components/ModalBuyAndSell';
import { ModalContext } from '../context/ModalContext';

function StockList() {
  const { isOpenModal } = useContext(ModalContext);
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <MyStocksTable />
      <StockTable />
      { isOpenModal && <ModalBuyAndSell /> }
      <button
        type="button"
        data-testid="button-deposit"
        onClick={() => navigate('/wallet')}
      >
        Déposito/Retirada
      </button>
    </div>
  );
}

export default StockList;

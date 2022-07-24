import React, { useContext } from 'react';

import Header from '../components/Header';
import MyStocksTable from '../components/MyStocksTable';
import StockTable from '../components/StockTable';
import ModalBuyAndSell from '../components/ModalBuyAndSell';
import { ModalContext } from '../context/ModalContext';

function StockList() {
  const { isOpenModal } = useContext(ModalContext);

  return (
    <div>
      <Header />
      <MyStocksTable />
      <StockTable />
      { isOpenModal && <ModalBuyAndSell /> }
    </div>
  );
}

export default StockList;

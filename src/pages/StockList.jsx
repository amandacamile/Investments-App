import React, { useContext } from 'react';
import Header from '../components/Header';

import StockTable from '../components/StockTable';
import { LoginContext } from '../context/LoginContext';

function StockList() {
  const { email } = useContext(LoginContext);

  return (
    <div>
      <Header email={email} />
      <StockTable />
    </div>
  );
}

export default StockList;

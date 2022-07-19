import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginProvider from './context/LoginContext';
import WalletProvider from './context/WalletContext';
import Login from './pages/Login';
import StockList from './pages/StockList';
import Wallet from './pages/Wallet';

function App() {
  return (
    <LoginProvider>
      <WalletProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/stocks" element={<StockList />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </WalletProvider>
    </LoginProvider>
  );
}

export default App;

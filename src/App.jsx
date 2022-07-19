import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginProvider from './context/LoginContext';
import Login from './pages/Login';
import StockList from './pages/StockList';

function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/stocks" element={<StockList />} />
      </Routes>
    </LoginProvider>
  );
}

export default App;

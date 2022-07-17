import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import StockList from './pages/StockList';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/stocks" element={<StockList />} />
    </Routes>
  );
}

export default App;

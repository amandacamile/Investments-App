import React, { useEffect, useState } from 'react';
import fetchStocksAPI from '../services/stocksAPI';
import TrandingButtons from './TrandingButtons';

function StockTable() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    (
      async () => {
        const getStocks = await fetchStocksAPI();
        setStocks(getStocks);
      }
    )();
  }, []);

  return (
    <div>
      <table>
        <caption>Disponíveis para investir:</caption>
        <thead>
          <tr>
            <th>Ação</th>
            <th>Qtde</th>
            <th>Valor (R$)</th>
            <th>Negociar</th>
          </tr>
        </thead>
        <tbody>
          {
            stocks.map((stock) => (
              <tr key={stock.AssetCode}>
                <td>{stock.AssetName}</td>
                <td>{stock.AssetQtd}</td>
                <td>{stock.Value}</td>
                <td><TrandingButtons /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;

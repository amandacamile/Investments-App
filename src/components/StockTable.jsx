import React, { useContext } from 'react';
import { StocksContext } from '../context/StocksContext';
import TrandingButtons from './TrandingButtons';

function StockTable() {
  const { stocks } = useContext(StocksContext);

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
                <td><TrandingButtons isMyStocksTable={false} /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;

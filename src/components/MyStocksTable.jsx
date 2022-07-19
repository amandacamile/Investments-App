import React, { useEffect, useState } from 'react';
import TrandingButtons from './TrandingButtons';

function MyStocksTable() {
  const [myStocks, setMyStocks] = useState([]);

  useEffect(() => {
    setMyStocks([
      {
        AssetCode: 1, AssetName: 'SBSP3', AssetQtd: 20, Value: 43.21,
      }, {
        AssetCode: 2, AssetName: 'RECV3', AssetQtd: 18, Value: 23.1,
      }, {
        AssetCode: 3, AssetName: 'PARD3', AssetQtd: 20, Value: 20.65,
      }]);
    // exemplos só para visualização
  }, []);

  return (
    <div>
      <table>
        <caption>Minhas ações:</caption>
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
            myStocks.map((stock) => (
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

export default MyStocksTable;

import React, { useContext } from 'react';
import { StocksContext } from '../context/StocksContext';
import { ModalContext } from '../context/ModalContext';

function StockTable() {
  const { stocks } = useContext(StocksContext);
  const { openModal } = useContext(ModalContext);

  const handleButton = ({
    id, name, qtd, value,
  }) => {
    openModal({
      id, name, qtd, value,
    });
  };

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
                <td>
                  <button
                    type="button"
                    onClick={() => handleButton({
                      id: stock.AssetCode,
                      name: stock.AssetName,
                      qtd: stock.AssetQtd,
                      value: stock.Value,
                    })}
                  >
                    C

                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;

import React, { useContext } from 'react';
import { StocksContext } from '../context/StocksContext';
// import { ModalContext } from '../context/ModalContext';

function MyStocksTable() {
  const { myStocks } = useContext(StocksContext);
  // const { openModal } = useContext(ModalContext);

  // const handleButton = ({
  //   id, name, qtd, value,
  // }) => {
  //   const infoStock = {
  //     id, name, qtd, value,
  //   };
  //   openModal(infoStock);
  // };

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
                <td>
                  <button type="button">$</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default MyStocksTable;

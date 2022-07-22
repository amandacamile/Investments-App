import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { StocksContext } from '../context/StocksContext';
import { WalletContext } from '../context/WalletContext';

function SellStocks() {
  const { infoStock } = useContext(ModalContext);
  const { balance, setBalance } = useContext(WalletContext);
  const { myStocks, manipulateStocks } = useContext(StocksContext);

  const [sellValue, setSellValue] = useState(0);

  const handleInputSell = ({ target }) => {
    setSellValue(Number(target.value));
  };

  const makeSale = () => {
    myStocks.map((stock) => {
      if (stock.AssetCode === infoStock.id) {
        Object.assign(stock, { AssetQtd: stock.AssetQtd - sellValue });
      } // diminuindo a quantidade de acoes que foram vendidas
      return stock;
    });
    manipulateStocks(infoStock, sellValue);
  };

  const handleButtonConfirm = () => {
    const totalSale = Number(sellValue * infoStock.value);
    makeSale();
    setBalance(balance + totalSale);
  };

  return (
    <div>
      <h1>Vender</h1>
      <table>
        <thead>
          <tr>
            <th>Ação</th>
            <th>Qtde</th>
            <th>Valor (R$)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{infoStock.name}</td>
            <td>{infoStock.qtd}</td>
            <td>{infoStock.value}</td>
          </tr>
        </tbody>
      </table>

      <input type="text" placeholder="Informe o valor" onChange={handleInputSell} />

      <button type="button" onClick={handleButtonConfirm}>Confirmar</button>
    </div>
  );
}

export default SellStocks;

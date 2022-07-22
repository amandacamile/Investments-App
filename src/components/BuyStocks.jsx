import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { StocksContext } from '../context/StocksContext';
import { WalletContext } from '../context/WalletContext';

function BuyStocks() {
  const { infoStock } = useContext(ModalContext);
  const { stocks, manipulateMyStocks } = useContext(StocksContext);
  const { balance, setBalance } = useContext(WalletContext);

  const [buyValue, setBuyValue] = useState(0);

  const handleInputBuy = ({ target }) => {
    setBuyValue(Number(target.value));
  };

  const makePurchase = () => {
    stocks.map((stock) => {
      if (stock.AssetCode === infoStock.id) {
        Object.assign(stock, { AssetQtd: stock.AssetQtd - buyValue });
      }
      return stock;
    }); // diminuindo quantidade de ações que foram compradas

    manipulateMyStocks(infoStock, buyValue); // adicionando a ação o estado global MyStocks
  };

  const handleButtonConfirm = () => {
    const purchaseTotal = (buyValue * infoStock.value).toFixed(2);
    if (balance >= purchaseTotal) {
      makePurchase();
      setBalance(balance - purchaseTotal);
    }
    // else {
    // Swal.fire({
    //   toast: true,
    //   position: 'top',
    //   showConfirmButton: false,
    //   timer: 3000,
    //   icon: 'error',
    //   title: 'Saldo insuficiente!',
    //   html:
    //     '<hr/>'
    //     + `<p>Saldo atual: RS ${balance}</p>`,
    // });
    // }
  };

  return (
    <div>
      <h1>Compra</h1>
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

      <input type="text" placeholder="Informe o valor" onChange={handleInputBuy} />
      {/* <button type="button">Vender</button>
        <input type="text" placeholder="Informe o valor" onChange={handleInputSell} /> */}

      <button type="button" onClick={handleButtonConfirm}>Confirmar</button>
    </div>
  );
}

export default BuyStocks;

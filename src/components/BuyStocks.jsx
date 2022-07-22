import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { ModalContext } from '../context/ModalContext';
import { StocksContext } from '../context/StocksContext';
import { WalletContext } from '../context/WalletContext';

function BuyStocks() {
  const { infoStock, updateInfoStock } = useContext(ModalContext);
  const { stocks, manipulateMyStocks } = useContext(StocksContext);
  const { balance, setBalance } = useContext(WalletContext);

  const [buyValue, setBuyValue] = useState(0);

  const [status, setStatus] = useState({
    type: '',
    message: '',
  });

  const handleInputBuy = ({ target }) => {
    setBuyValue(Number(target.value));
  };

  const validateBuyValue = async () => {
    const schemaBuy = yup.number().typeError('Somente números são válidos')
      .positive('Informe a quantidade de ações a ser comprada')
      .required('Informe a quantidade de ações a ser comprada');

    try {
      await schemaBuy.validate(buyValue);
      setStatus({ type: 'sucess' });
      return true;
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.errors,
      });
      return false;
    }
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

  const handleButtonConfirm = async () => {
    if (!(await validateBuyValue())) return;

    const purchaseTotal = (buyValue * infoStock.value).toFixed(2);

    if (balance >= purchaseTotal) {
      makePurchase();
      setBalance(balance - purchaseTotal);
    } else {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).fire({
        icon: 'warning',
        title: 'Saldo Insuficiente!',
      });
    }

    updateInfoStock({ ...infoStock, qtd: infoStock.qtd - buyValue });
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
      <p style={status.type === 'error' ? { color: '#ff0000' } : null}>{status.message}</p>
      <input type="text" placeholder="Informe o valor" onChange={handleInputBuy} />
      {/* <button type="button">Vender</button>
        <input type="text" placeholder="Informe o valor" onChange={handleInputSell} /> */}

      <button type="button" onClick={handleButtonConfirm}>Confirmar</button>
    </div>
  );
}

export default BuyStocks;

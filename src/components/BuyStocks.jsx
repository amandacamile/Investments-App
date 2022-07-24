import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { ModalContext } from '../context/ModalContext';
import { StocksContext } from '../context/StocksContext';
import { WalletContext } from '../context/WalletContext';

function BuyStocks() {
  const { infoStock, updateInfoStock, closeModal } = useContext(ModalContext);
  const { stocks, manipulateMyStocks, removeZeroedStocks } = useContext(StocksContext);
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
    if (buyValue > infoStock.qtd) {
      setStatus({
        type: 'error',
        message: 'O valor informado é maior que a quantidade disponível',
      });
      return false;
    }

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

    removeZeroedStocks();
  };

  const handleButtonConfirm = async () => {
    if (!(await validateBuyValue())) return;

    // valor total da compra
    const purchaseTotal = (buyValue * infoStock.value).toFixed(2);

    if (balance >= purchaseTotal) {
      Swal.fire({
        title: 'Deseja efetuar a compra?',
        html:
        `<p>Quantidade de ações: ${buyValue}</p>`
        + '<br/>'
        + `<p>Valor Total: R$ ${purchaseTotal}</p>`
        + '<br/><hr/><br/>'
        + `<p>Saldo Atual: R$ ${balance.toFixed(2)}</p>`,
        text: 'Ao clicar em Sim a compra será efetuada!',
        color: '#000000',
        showCancelButton: true,
        cancelButtonColor: '#A6A6A6',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#121212',
        confirmButtonText: 'Sim',
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          makePurchase();
          setBalance(balance - purchaseTotal);
          Swal.fire({
            icon: 'success',
            iconColor: '#FFC709',
            color: '#000000',
            title: 'Compra Efetuada!',
            text: 'Ação comprada já consta em suas ações',
            confirmButtonColor: '#121212',
            confirmButtonText: 'Ok',
            showConfirmButton: true,
          });
        }
        closeModal();
      });
    } else {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        showClass: { popup: 'swal2-noanimation' },
      }).fire({
        icon: 'warning',
        iconColor: '#FFC709',
        color: '#121212',
        title: 'Saldo Insuficiente!',
      });
    }

    updateInfoStock({ ...infoStock, qtd: infoStock.qtd - buyValue });
  };

  return (
    <div>
      <div className="w-full flex items-center justify-center pt-5">
        <table className="w-4/5 mb-10">
          <thead className="bg-tangerine-yellow">
            <tr>
              <th className="px-4 py-3 text-center text-base font-bold tracking-wider">Ação</th>
              <th className="px-4 py-3 text-center text-base font-bold tracking-wider">Qtde</th>
              <th className="px-4 py-3 text-center text-base font-bold tracking-wider">Valor (R$)</th>
            </tr>
          </thead>
          <tbody className="bg-light-grey">
            <tr>
              <td className="px-4 py-3 text-center text-sm font-medium text-black">{infoStock.name}</td>
              <td className="px-4 py-3 text-center text-sm font-medium text-black">{infoStock.qtd}</td>
              <td className="px-4 py-3 text-center text-sm font-medium text-black">{infoStock.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style={status.type === 'error' ? { color: '#ff0000' } : null}>{status.message}</p>
      <div className="p-5 flex items-end justify-center">
        <label
          htmlFor="amount"
          className="text-chinese-grey text-xl font-bold"
        >
          Quantidade
          <input
            type="text"
            id="amount"
            className="block border rounded w-3/4 py-2 px-3 mr-1 text-gray-700"
            placeholder="Informe o valor"
            onChange={handleInputBuy}
          />
        </label>

        <button
          type="button"
          className="w-1/4 bg-chinese-black text-white text-xl font-bold py-3 px-3 rounded"
          onClick={handleButtonConfirm}
        >
          Confirmar

        </button>
      </div>
    </div>
  );
}

export default BuyStocks;

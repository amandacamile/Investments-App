import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { ModalContext } from '../context/ModalContext';
import { StocksContext } from '../context/StocksContext';
import { WalletContext } from '../context/WalletContext';

function SellStocks() {
  const { infoStock, updateInfoStock, closeModal } = useContext(ModalContext);
  const { balance, setBalance } = useContext(WalletContext);
  const { myStocks, manipulateStocks } = useContext(StocksContext);

  const [sellValue, setSellValue] = useState(0);
  const [status, setStatus] = useState({
    type: '',
    message: '',
  });

  const handleInputSell = ({ target }) => {
    setSellValue(Number(target.value));
  };

  const validateSellValue = async () => {
    if (sellValue > infoStock.qtd) {
      setStatus({
        type: 'error',
        message: 'O valor informado é maior que a quantidade disponível',
      });
      return false;
    }

    const schemaSell = yup.number().typeError('Somente números são válidos')
      .positive('Informe a quantidade de ações a ser vendida')
      .required('Informe a quantidade de ações a ser vendida');

    try {
      await schemaSell.validate(sellValue);
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

  const makeSale = () => {
    myStocks.map((stock) => {
      if (stock.AssetCode === infoStock.id) {
        Object.assign(stock, { AssetQtd: stock.AssetQtd - sellValue });
      } // diminuindo a quantidade de acoes que foram vendidas
      return stock;
    });
    manipulateStocks(infoStock, sellValue);
  };

  const handleButtonConfirm = async () => {
    if (!(await validateSellValue())) return;

    const totalSale = Number(sellValue * infoStock.value);

    Swal.fire({
      title: 'Deseja efetuar a venda?',
      html:
        '<p >Quantidade de ações:</p>'
        + `<p>${sellValue}</p>`
        + '<p >Valor Total da Venda:</p>'
        + `<p>R$ ${totalSale}</p>`,
      text: 'Ao clicar em Sim a compra será efetuada!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        makeSale();
        setBalance(balance + totalSale);
        Swal.fire(
          'Venda Efetuada!',
          'success',
        );
      }
      closeModal();
    });

    updateInfoStock({ ...infoStock, qtd: infoStock.qtd - sellValue });
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
          className="text-chinese-grey text-xl font-bold"
          htmlFor="amount"
        >
          Quantidade
          <input
            type="text"
            id="amount"
            className="block border rounded w-3/4 py-2 px-3 mr-1 text-gray-700"
            placeholder="Informe o valor"
            onChange={handleInputSell}
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

export default SellStocks;

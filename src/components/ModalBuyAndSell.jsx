import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { ModalContext } from '../context/ModalContext';
import { StocksContext } from '../context/StocksContext';
import { WalletContext } from '../context/WalletContext';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function ModalBuyAndSell() {
  const { isOpenModal, infoStock, closeModal } = useContext(ModalContext);
  const { stocks, manipulateMyStocks } = useContext(StocksContext);
  const { balance, setBalance } = useContext(WalletContext);

  console.log(balance);

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
    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: 'Saldo insuficiente!',
        html:
          '<hr/>'
          + `<p>Saldo atual: RS ${balance}</p>`,
      });
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={() => closeModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button type="button">Comprar</button>
        <button type="button">Vender</button>
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

        <button type="button" onClick={closeModal}>Voltar</button>
        <button type="button" onClick={handleButtonConfirm}>Confirmar</button>
      </Modal>
    </div>
  );
}

export default ModalBuyAndSell;

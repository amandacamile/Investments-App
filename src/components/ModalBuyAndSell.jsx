import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../context/ModalContext';
import { StocksContext } from '../context/StocksContext';

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
  const {
    isOpenModal, infoStock, closeModal, /* updateStockInfo, */
  } = useContext(ModalContext);
  // const { myStocks, setMyStocks } = useContext(StocksContext);
  const { stocks } = useContext(StocksContext);

  const [buyValue, setBuyValue] = useState(0);
  // const [sellValue, setSellValue] = useState('');

  const handleInputBuy = ({ target }) => {
    setBuyValue(Number(target.value));
  };

  const handleButtonConfirm = () => {
    const mapStocks = stocks.map((stock) => {
      if (stock.AssetCode === infoStock.id) {
        const newValue = stock.AssetQtd - buyValue;
        Object.assign(stock, { AssetQtd: newValue });
      }
      return stock;
    });

    return mapStocks;
  };

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={() => closeModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1>Compra/Venda</h1>
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

        <button type="button">Comprar</button>
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

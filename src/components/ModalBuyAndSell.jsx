import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../context/ModalContext';
import '../styles/modal.css';
import BuyStocks from './BuyStocks';
import SellStocks from './SellStocks';

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
  const { isOpenModal, closeModal } = useContext(ModalContext);

  const [isBuy, setIsBuy] = useState(true);
  const [isSell, setIsSell] = useState(false);

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={() => closeModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          type="button"
          className={isBuy ? 'enabled-button' : 'disabled-button'}
          onClick={() => {
            setIsBuy(true);
            setIsSell(false);
          }}
        >
          Comprar

        </button>
        <button
          type="button"
          className={isSell ? 'enabled-button' : 'disabled-button'}
          onClick={() => {
            setIsSell(true);
            setIsBuy(false);
          }}
        >
          Vender

        </button>
        { isBuy ? <BuyStocks /> : <SellStocks /> }
        <button type="button" onClick={closeModal}>Voltar</button>
      </Modal>
    </div>
  );
}

export default ModalBuyAndSell;

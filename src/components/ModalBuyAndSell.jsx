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
    border: 'none',
    'box-shadow': '0px 5px 15px rgba(0, 0, 0, 0.35)',
    padding: '0',
    width: '50rem',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function ModalBuyAndSell() {
  const { isOpenModal, closeModal } = useContext(ModalContext);

  const [isBuy, setIsBuy] = useState(true);
  const [isSell, setIsSell] = useState(false);

  return (
    <div className="m-12 shadow-lg">
      <Modal
        isOpen={isOpenModal}
        onRequestClose={() => closeModal()}
        // className="bg-tangerine-yellow w-6/12"
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          type="button"
          className={
            isBuy
              ? 'bg-chinese-black text-white text-center text-base font-bold tracking-wider py-4 w-1/2'
              : 'bg-light-grey text-black text-center text-base font-bold tracking-wider py-4 w-1/2'
          }
          onClick={() => {
            setIsBuy(true);
            setIsSell(false);
          }}
        >
          Comprar

        </button>
        <button
          type="button"
          className={
            isSell
              ? 'bg-chinese-black text-white text-center text-base font-bold tracking-wider py-4 w-1/2'
              : 'bg-light-grey text-black text-center text-base font-bold tracking-wider py-4 w-1/2'
          }
          onClick={() => {
            setIsSell(true);
            setIsBuy(false);
          }}
        >
          Vender

        </button>
        { isBuy ? <BuyStocks /> : <SellStocks /> }
        <div className="flex justify-center p-5">
          <button
            type="button"
            className="w-1/4 bg-tangerine-yellow text-black text-xl font-bold py-3 px-3 rounded"
            onClick={closeModal}
          >
            Voltar

          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalBuyAndSell;

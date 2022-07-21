import React, { useContext } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../context/ModalContext';

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

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={() => closeModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button type="button" onClick={closeModal}>close</button>
        <div>Compra/Venda</div>
      </Modal>
    </div>
  );
}

export default ModalBuyAndSell;

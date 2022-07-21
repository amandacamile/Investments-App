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
  const { isOpenModal, infoStock, closeModal } = useContext(ModalContext);

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={() => closeModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <button type="button" onClick={closeModal}>close</button> */}
        <div>Compra/Venda</div>
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
        <input type="text" placeholder="Informe o valor" />
        <button type="button">Vender</button>
        <input type="text" placeholder="Informe o valor" />

        <button type="button" onClick={closeModal}>Voltar</button>
        <button type="button">Confirmar</button>
      </Modal>
    </div>
  );
}

export default ModalBuyAndSell;

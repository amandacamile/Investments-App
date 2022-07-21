import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ModalContext = createContext({});

function ModalProvider({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [infoStock, setInfoStock] = useState({});

  const openModal = (stock) => {
    setInfoStock({ name: stock.name, qtd: stock.qtd, value: stock.value });
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ModalContext.Provider value={{
      isOpenModal, infoStock, openModal, closeModal,
    }}
    >
      {children}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalProvider;

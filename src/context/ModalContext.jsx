import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ModalContext = createContext({});

function ModalProvider({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [infoStock, setInfoStock] = useState({});

  const openModal = ({
    id, name, qtd, value,
  }) => {
    setInfoStock({
      id, name, qtd, value,
    });
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  // const updateStockInfo = (info) => {
  //   setInfoStock({ ...infoStock, qtd: info });
  // };

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

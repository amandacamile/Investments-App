import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../context/ModalContext';

function TrandingButtons({ isMyStocksTable }) {
  const { openModal } = useContext(ModalContext);

  return (
    <div>
      <button type="button" onClick={openModal}>C</button>
      { isMyStocksTable && <button type="button" onClick={openModal}>V</button> }
    </div>
  );
}

TrandingButtons.propTypes = {
  isMyStocksTable: PropTypes.bool.isRequired,
};

export default TrandingButtons;

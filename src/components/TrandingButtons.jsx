import React from 'react';
import PropTypes from 'prop-types';

function TrandingButtons({ isMyStocksTable }) {
  return (
    <div>
      <button type="button">C</button>
      { isMyStocksTable && <button type="button">V</button> }
    </div>
  );
}

TrandingButtons.propTypes = {
  isMyStocksTable: PropTypes.bool.isRequired,
};

export default TrandingButtons;

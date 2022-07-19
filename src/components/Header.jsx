import React from 'react';
import PropTypes from 'prop-types';

function Header({ email }) {
  const userName = email.slice(0, email.indexOf('@'));
  return (
    <header>
      <h2>{ `Usuário: ${userName}` }</h2>
    </header>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Header;

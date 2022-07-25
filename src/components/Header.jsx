import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

function Header({ hideWalletButton }) {
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const userName = login.email.slice(0, login.email.indexOf('@'));

  return (
    <header className="bg-chinese-black p-8 flex items-end justify-end">
      <h2 className="bg-light-grey text-black text-xl min-w-min font-bold p-2 justify-content rounded w-1/4">{ `Usuário: ${userName}` }</h2>
      {!hideWalletButton && (
      <button
        type="button"
        data-testid="button-deposit"
        className="w-64 bg-tangerine-yellow text-chinese-grey text-xl font-bold p-2 rounded ml-5"
        onClick={() => navigate('/wallet')}
      >
        Acessar minha carteira
      </button>
      )}
    </header>
  );
}

Header.defaultProps = {
  hideWalletButton: false,
};

Header.propTypes = {
  hideWalletButton: PropTypes.bool,
};

export default Header;

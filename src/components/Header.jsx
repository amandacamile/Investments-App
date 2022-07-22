import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

function Header() {
  const { login } = useContext(LoginContext);
  const userName = login.email.slice(0, login.email.indexOf('@'));

  return (
    <header>
      <h2>{ `Usuário: ${userName}` }</h2>
    </header>
  );
}

export default Header;

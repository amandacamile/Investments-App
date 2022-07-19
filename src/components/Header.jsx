import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

function Header() {
  const { email } = useContext(LoginContext);
  const userName = email.slice(0, email.indexOf('@'));

  return (
    <header>
      <h2>{ `Usuário: ${userName}` }</h2>
    </header>
  );
}

export default Header;

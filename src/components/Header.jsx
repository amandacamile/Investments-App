import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

function Header() {
  const { login } = useContext(LoginContext);
  const userName = login.email.slice(0, login.email.indexOf('@'));

  return (
    <header className="bg-chinese-black p-8 flex justify-end">
      <h2 className="bg-light-grey text-black min-w-min font-bold p-2 justify-content rounded w-1/4">{ `Usuário: ${userName}` }</h2>
    </header>
  );
}

export default Header;

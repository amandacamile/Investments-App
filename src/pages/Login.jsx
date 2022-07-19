import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

function Login() {
  const navigate = useNavigate();

  const { setEmail } = useContext(LoginContext);

  const handleInputChange = ({ target }) => {
    setEmail(target.value);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="E-mail"
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder="Senha"
      />
      <button
        type="button"
        onClick={() => navigate('/stocks')}
      >
        Acessar
      </button>
    </div>
  );
}

export default Login;

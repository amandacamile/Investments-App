import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

function Login() {
  const navigate = useNavigate();

  const { login, setLogin } = useContext(LoginContext);

  const handleInputChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  return (
    <div>
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        onChange={handleInputChange}
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

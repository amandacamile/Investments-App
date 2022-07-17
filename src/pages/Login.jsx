import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <input
        type="email"
        placeholder="E-mail"
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

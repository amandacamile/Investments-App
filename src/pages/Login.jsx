import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { LoginContext } from '../context/LoginContext';

function Login() {
  const navigate = useNavigate();

  const { login, updateLogin } = useContext(LoginContext);

  const [status, setStatus] = useState({
    type: '',
    message: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const validateLogin = async () => {
    const schemaEmail = yup.string().email('Insira um email válido!').required('É necessário preencher o email!');
    const schemaPass = yup.string().required('É necessário preencher a senha!').min(6, 'A senha deve ter no mínimo 6 caracteres!');
    // schemas separados para serem validados unitariamente
    try {
      await schemaEmail.validate(login.email);
      await schemaPass.validate(login.password);
      setStatus({ type: 'sucess' });
      return true;
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.errors,
      });
      return false;
    }
  };

  const handleAcessButton = () => {
    // é assincrona pois deve ser executada antes de qualquer outro
    navigate('/stocks');
  };

  const handleInputChange = async ({ target: { name, value } }) => {
    try {
      await validateLogin();
      updateLogin({
        ...login,
        [name]: value,
      });
      setIsDisabled(false);
    } catch (error) {
      setIsDisabled(true);
    }
  };

  return (
    <div>
      <p style={status.type === 'error' ? { color: '#ff0000' } : null}>{status.message}</p>
      <input
        type="email"
        name="email"
        data-testid="email-login"
        placeholder="E-mail"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        data-testid="password-login"
        placeholder="Senha"
        onChange={handleInputChange}
      />
      <button
        type="button"
        data-testid="button-login"
        disabled={isDisabled}
        onClick={handleAcessButton}
      >
        Acessar
      </button>
    </div>
  );
}

export default Login;

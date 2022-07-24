import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { LoginContext } from '../context/LoginContext';

function Login() {
  const navigate = useNavigate();

  const { login, updateLogin } = useContext(LoginContext);

  const [status, setStatus] = useState({
    type: '',
    isError: false,
    message: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const validateLogin = async () => {
    const schemaLogin = yup.object().shape({
      email: yup.string().email('Insira um email válido!').required('É necessário preencher o email!'),
      password: yup.string().required('É necessário preencher a senha!').min(6, 'A senha deve ter no mínimo 6 caracteres!'),
    });

    try {
      await schemaLogin.validate(login);
      setStatus({ type: 'sucess' });

      setIsDisabled(false);
      return true;
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.errors,
      });

      setIsDisabled(true);
      return false;
    }
  };

  const handleAcessButton = async () => {
    if (!(await validateLogin())) return;
    navigate('/stocks');
  };

  const handleInputChange = async ({ target: { name, value } }) => {
    await validateLogin();
    updateLogin({
      ...login,
      [name]: value,
    });
  };

  return (
    <div className="h-screen bg-white grid items-center justify-center">
      <form className="shadow-3xl rounded-lg bg-light-grey px-20 pt-20 pb-20 mb-8">
        <div className="mb-10">
          <label className="block text-chinese-grey text-xl font-bold mb-4" htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              data-testid="email-login"
              placeholder="Insira seu email"
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="mb-16">
          <label className="block text-chinese-grey text-xl font-bold mb-2" htmlFor="email">
            Senha
            <input
              type="password"
              name="password"
              className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              data-testid="password-login"
              placeholder="Insira sua senha"
              onChange={handleInputChange}
            />
          </label>
        </div>

        <p style={status.type === 'error' ? { color: '#ff0000' } : null}>{status.message}</p>
        <div className="flex justify-center">
          <button
            type="button"
            data-testid="button-login"
            disabled={isDisabled}
            className="md:w-2/3 bg-tangerine-yellow text-chinese-grey text-xl font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={handleAcessButton}
          >
            Acessar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

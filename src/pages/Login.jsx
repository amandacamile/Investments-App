import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { LoginContext } from '../context/LoginContext';
import roadImage from '../_assets/img/ROAD.png';

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

  // eslint-disable-next-line consistent-return
  const handleInputChange = async ({ target: { name, value } }) => {
    try {
      await validateLogin();
      updateLogin({
        ...login,
        [name]: value,
      });
    } catch (error) {
      return null;
    }
  };

  return (
    <div>

      <div className="h-screen bg-white grid items-center justify-center">
        <img className="w-11/12 mx-auto" src={roadImage} alt="Imagem com a palavra ROAD escrita" />
        <form className="shadow-3xl rounded-lg bg-chinese-black px-20 pt-20 pb-20 mb-8">
          <div className="mb-10">
            <label className="block text-white text-xl font-bold mb-4" htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-chinese-black bg-light-grey"
                name="email"
                data-testid="email-login"
                placeholder="Insira seu email"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="mb-12">
            <label className="block text-light-grey text-xl font-bold mb-2" htmlFor="email">
              Senha
              <input
                type="password"
                name="password"
                className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-chinese-black bg-light-grey"
                data-testid="password-login"
                placeholder="Insira sua senha"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <p className={status.type === 'error'
            ? 'text-red font-bold text-center text-lg p-3'
            : null}
          >
            {status.message}

          </p>
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
    </div>
  );
}

export default Login;

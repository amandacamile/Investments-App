import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Header from '../components/Header';
import { WalletContext } from '../context/WalletContext';

function Wallet() {
  const navigate = useNavigate();
  const { balance, setBalance } = useContext(WalletContext);

  const [isDeposit, setIsDeposit] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [valueInput, setValueInput] = useState('');

  const [status, setStatus] = useState({
    type: '',
    message: '',
  });

  const handleInputValue = ({ target }) => {
    setValueInput(target.value);
  };

  const validateInputWallet = async () => {
    if (!isDeposit && !isWithdraw) {
      setStatus({
        type: 'error',
        message: 'Selecione uma das opções acima',
      });
      return false;
    }

    if (isWithdraw && valueInput > balance) {
      setStatus({
        type: 'error',
        message: 'Valor inserido maior que o saldo disponível',
      });
      return false;
    }

    const schemaWallet = yup.number().typeError('Somente números são válidos')
      .positive('Informe uma quantidade válida')
      .required('Informe a quantidade');

    try {
      await schemaWallet.validate(valueInput);
      return true;
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.errors,
      });
      return false;
    }
  };

  const transactionConfirmation = async () => {
    if (!(await validateInputWallet())) return;

    if (isDeposit && valueInput) setBalance(balance + Number(valueInput));
    if (isWithdraw && valueInput) setBalance(balance - Number(valueInput));
    setValueInput('');
  };

  return (
    <div>
      <Header hideWalletButton />
      <div className="bg-tangerine-yellow p-5 flex justify-around text-black text-xl min-w-min font-bold mb-5">
        <h3>Saldo em conta:</h3>
        <h3>{`R$ ${Number(balance).toFixed(2)}`}</h3>
      </div>
      <div className="flex justify-center">
        <button
          className={isDeposit ? 'bg-chinese-black text-white text-center text-base font-bold tracking-wider py-4 mr-5 w-1/4 rounded'
            : 'bg-light-grey text-black text-center text-base font-bold tracking-wider py-4 w-1/4 mr-4 rounded'}
          type="button"
          name="deposit"
          onClick={() => {
            setIsDeposit(true);
            setIsWithdraw(false);
          }}
        >
          Depósito
        </button>
        <button
          type="button"
          className={isWithdraw ? 'bg-chinese-black text-white text-center text-base font-bold tracking-wider py-4 w-1/4 rounded'
            : 'bg-light-grey text-black text-center text-base font-bold tracking-wider py-4 w-1/4 rounded'}
          name="withdraw"
          onClick={() => {
            setIsWithdraw(true);
            setIsDeposit(false);
          }}
        >
          Retirada
        </button>
      </div>
      <p style={status.type === 'error' ? { color: '#ff0000' } : null}>{status.message}</p>
      <div className="p-5 flex items-end justify-center">
        <label
          className="text-chinese-grey text-lg font-bold"
          htmlFor="valueWallet"
        >
          <input
            type="text"
            id="valueWallet"
            className="block bg-light-grey rounded-l w-full py-3 px-3 text-gray-700"
            value={valueInput}
            placeholder="Informe o valor"
            onChange={handleInputValue}
          />
        </label>
        <button
          type="button"
          className="w-1/4 bg-chinese-black text-white text-xl font-bold py-3 px-3 rounded-r"
          onClick={() => transactionConfirmation()}
        >
          Confirmar

        </button>
      </div>

      <div className="flex justify-center p-5">
        <button
          type="button"
          className="w-1/4 bg-tangerine-yellow text-black text-xl font-bold py-3 px-3 rounded"
          onClick={() => navigate('/stocks')}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default Wallet;

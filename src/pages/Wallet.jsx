import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Header from '../components/Header';
import { WalletContext } from '../context/WalletContext';
import '../styles/wallet.css';

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
    setValueInput(Number(target.value));
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

    if (isDeposit && valueInput) setBalance(balance + valueInput);
    if (isWithdraw && valueInput) setBalance(balance - valueInput);
    setValueInput('');
  };

  return (
    <div>
      <Header />
      <h3>Saldo em conta:</h3>
      <h3>{`R$ ${Number(balance).toFixed(2)}`}</h3>
      <button
        className={isDeposit ? 'enabled-button' : 'disabled-button'}
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
        className={isWithdraw ? 'enabled-button' : 'disabled-button'}
        name="withdraw"
        onClick={() => {
          setIsWithdraw(true);
          setIsDeposit(false);
        }}
      >
        Retirada
      </button>
      <p style={status.type === 'error' ? { color: '#ff0000' } : null}>{status.message}</p>
      <input
        type="text"
        value={valueInput}
        placeholder="Informe o valor"
        onChange={handleInputValue}
      />

      <button
        type="button"
        onClick={() => navigate('/stocks')}
      >
        Voltar
      </button>
      <button
        type="button"
        onClick={() => transactionConfirmation()}
      >
        Confirmar

      </button>
    </div>
  );
}

export default Wallet;

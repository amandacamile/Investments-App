import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { WalletContext } from '../context/WalletContext';
import '../styles/wallet.css';

function Wallet() {
  const navigate = useNavigate();
  const { balance, setBalance } = useContext(WalletContext);

  const [isDeposit, setIsDeposit] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [valueInput, setValueInput] = useState('');

  const handleInputValue = ({ target }) => {
    setValueInput(Number(target.value));
  };

  const transactionConfirmation = () => {
    if (isDeposit && valueInput) setBalance(balance + valueInput);
    if (isWithdraw && valueInput) setBalance(balance - valueInput);
    setValueInput('');
  };

  return (
    <div>
      <Header />
      <h3>Saldo em conta:</h3>
      <h3>{`R$ ${balance}`}</h3>
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

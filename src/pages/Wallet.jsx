import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { WalletContext } from '../context/WalletContext';
import '../styles/wallet.css';

function Wallet() {
  const navigate = useNavigate();
  const { balance } = useContext(WalletContext);

  const [isDeposit, setIsDeposit] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);

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
      <input type="text" />

      <button
        type="button"
        onClick={() => navigate('/stocks')}
      >
        Voltar
      </button>
      <button type="button">Confirmar</button>
    </div>
  );
}

export default Wallet;

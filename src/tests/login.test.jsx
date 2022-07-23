import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testando a página de Login', () => {
  it('caminho feliz', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId('email-login');
    expect(inputEmail).toHaveValue('');
    userEvent.type(inputEmail, 'teste@teste.com');
    expect(inputEmail).toHaveValue('teste@teste.com');

    //
    const inputPassword = screen.getByTestId('password-login');
    expect(inputPassword).toHaveValue('');
    userEvent.type(inputPassword, '0123456789');
    expect(inputPassword).toHaveValue('0123456789');
  });

  it('otro teste', () => {
    const { history } = renderWithRouter(<Login />);

    userEvent.type(screen.getByTestId('email-login'), 'teste@teste.com');
    userEvent.type(screen.getByTestId('password-login'), '0123456789');

    const buttonLogin = screen.getByTestId('button-login');

    expect(buttonLogin).toBeInTheDocument();
    userEvent.click(buttonLogin);
    const { pathname } = history.location;
    expect(pathname).toBe('/stocks');
  });

  // it('testando pagins
});

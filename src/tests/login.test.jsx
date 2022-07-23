import React from 'react';
import Login from '../pages/Login';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testando a página de Login', () => {
  it('caminho feliz', () => {
    renderWithRouter(<Login />);
  });
});

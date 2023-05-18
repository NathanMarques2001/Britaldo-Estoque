import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Login } from '../Login';
import AuthService from '../../services/auth/AuthService';

jest.mock('../../services/auth/AuthService');

describe('Login', () => {
  beforeEach(() => {
    AuthService.mockClear();
  });

  test('submits form with valid email and password', () => {
    const mockLogar = jest.fn();
    AuthService.prototype.logar = mockLogar;

    render(<Login />);

    const emailInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    // Verifica se a função AuthService.logar() foi chamada corretamente com os parâmetros esperados
    expect(mockLogar).toHaveBeenCalledWith('example@example.com', 'password123');
  });
});

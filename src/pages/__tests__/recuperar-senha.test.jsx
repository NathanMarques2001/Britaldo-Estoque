import { expect, describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { RecuperarSenha } from '../recuperar-senha';
import AuthService from '../../services/auth/AuthService';
import { toBeCalledWithAsync } from '../../utils/testes';
import 'jest-extended';


describe('Recuperar senha page', () => {

  expect.extend({ toBeCalledWithAsync });

  let authServiceMock;

  beforeEach(() => {
    authServiceMock = vi.fn().mockImplementation(new AuthService().recuperarSenha);
    render(
      <Router>
        <RecuperarSenha authService={authServiceMock} />
      </Router>
    );
  });

  const validUserMock = {
    email: "britaldoestoque@gmail.com"
  }

  const invalidUserMock = {
    email: "emailinvalido@email.com"
  }

  afterEach(() => {
    authServiceMock.mockClear();
  });

  it('Deve renderizar a página sem erros', () => {

    const inputEmail = screen.getByPlaceholderText("Ex: Email@email.com")
    expect(inputEmail).toBeInTheDocument()

    const botaoEnviar = screen.getByText("Enviar")
    expect(botaoEnviar).toBeInTheDocument()

    const botaoCancelar = screen.getByText("Cancelar")
    expect(botaoCancelar).toBeInTheDocument()

    const imagemRecuperarSenha = screen.getByAltText("Imagem esqueci a senha")
    expect(imagemRecuperarSenha).toBeInTheDocument()
  })

  it('Deve funcionar os eventos dos componentes', () => {

    const inputEmail = screen.getByPlaceholderText("Ex: Email@email.com")
    const botaoEnviar = screen.getByText("Enviar")
    const botaoCancelar = screen.getByText("Cancelar")

    fireEvent.change(inputEmail, { target: { value: validUserMock.email } })
    fireEvent.click(botaoEnviar)
    fireEvent.click(botaoCancelar)

  })

  it('Deve enviar o formulário', async () => {

    expect(authServiceMock).toBeTruthy()

    await expect(authServiceMock).toBeCalledWithAsync(validUserMock.email);
    await expect(authServiceMock).toBeCalledWithAsync(invalidUserMock.email).catch(e => expect(e).toBeInstanceOf(Error));
  })

})
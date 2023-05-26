import { expect, describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Login } from '../login/index'
import AuthService from '../../services/auth/AuthService';
import { toBeCalledWithAsync } from '../../utils/testes';
import 'jest-extended';
import { usuarioValido, usuarioInvalido } from './mock';


describe('Login Page', () => {

  expect.extend({ toBeCalledWithAsync });

  let authServiceMock;

  beforeEach(() => {
    authServiceMock = vi.fn().mockImplementation(new AuthService().logar);
    render(
      <Router>
        <Login authService={authServiceMock} />
      </Router>
    );
  });

  afterEach(() => {
    authServiceMock.mockClear();
  });

  it('Deve renderizar a página sem erros', () => {

    const inputEmail = screen.getByPlaceholderText("Insira seu e-mail")
    expect(inputEmail).toBeInTheDocument()

    const inputSenha = screen.getByPlaceholderText("Insira sua senha")
    expect(inputSenha).toBeInTheDocument()

    const botaoEntrar = screen.getByText("Entrar")
    expect(botaoEntrar).toBeInTheDocument()

    const botaoCadastro = screen.getByText("Criar conta")
    expect(botaoCadastro).toBeInTheDocument()

    const imagemLogin = screen.getByAltText("imagem-login")
    expect(imagemLogin).toBeInTheDocument()

    const linkRecuperarSenha = screen.getByText("Esqueceu sua senha?")
    expect(linkRecuperarSenha).toBeInTheDocument()
  })

  it('Deve funcionar os eventos dos componentes', () => {

    const inputEmail = screen.getByPlaceholderText("Insira seu e-mail")
    const inputSenha = screen.getByPlaceholderText("Insira sua senha")
    const entrarButton = screen.getByText('Entrar')
    const cadastrarButton = screen.getByText('Criar conta')

    fireEvent.change(inputEmail, { target: { value: usuarioValido.email } })
    fireEvent.change(inputSenha, { target: { value: usuarioValido.senha } })
    fireEvent.click(entrarButton)
    fireEvent.click(cadastrarButton)

  })

  it('Deve enviar o formulário', async () => {

    expect(authServiceMock).toBeTruthy()

    await expect(authServiceMock).toBeCalledWithAsync(usuarioValido.email, usuarioValido.senha)
    await expect(authServiceMock).toBeCalledWithAsync(usuarioInvalido.email, usuarioInvalido.senha).catch(e => expect(e).toBeInstanceOf(Error));
  })

})
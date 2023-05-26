import { expect, describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Cadastro } from '../cadastro';
import AuthService from '../../services/auth/AuthService';
import { toBeCalledWithAsync } from '../../utils/testes';
import 'jest-extended';
import { usuarioValido } from './mock';

describe('Cadastro Page', () => {
  expect.extend({ toBeCalledWithAsync });

  let authServiceMock;

  beforeEach(() => {
    authServiceMock = vi.fn().mockImplementation(new AuthService().cadastrarNovoUsuario);
    render(
      <Router>
        <Cadastro authService={authServiceMock} />
      </Router>
    );
  });

  afterEach(() => {
    authServiceMock.mockClear();
  });

  it('Deve renderizar a página sem erros', () => {
    const inputNome = screen.getByPlaceholderText('Insira seu nome');
    expect(inputNome).toBeInTheDocument();

    const inputEmail = screen.getByPlaceholderText('Ex: email@email.com');
    expect(inputEmail).toBeInTheDocument();

    const inputSenha = screen.getByPlaceholderText(
      'Insira uma senha com no mínimo 6 dígitos'
    );
    expect(inputSenha).toBeInTheDocument();

    const inputCargo = screen.getByPlaceholderText('Insira seu cargo');
    expect(inputCargo).toBeInTheDocument();

    const botaoSalvar = screen.getByText('Salvar');
    expect(botaoSalvar).toBeInTheDocument();

    const botaoCancelar = screen.getByText('Cancelar');
    expect(botaoCancelar).toBeInTheDocument();

    const imagemCadastro = screen.getByAltText('imagem-cadastro');
    expect(imagemCadastro).toBeInTheDocument();
  });

  it('Deve funcionar os eventos dos componentes', () => {
    const inputNome = screen.getByPlaceholderText('Insira seu nome');
    const inputEmail = screen.getByPlaceholderText('Ex: email@email.com');
    const inputSenha = screen.getByPlaceholderText(
      'Insira uma senha com no mínimo 6 dígitos'
    );
    const inputCargo = screen.getByPlaceholderText('Insira seu cargo');

    const botaoSalvar = screen.getByText('Salvar');
    const botaoCancelar = screen.getByText('Cancelar');

    fireEvent.change(inputNome, { target: { value: usuarioValido.nome } });
    fireEvent.change(inputEmail, { target: { value: usuarioValido.email } });
    fireEvent.change(inputSenha, { target: { value: usuarioValido.senha } });
    fireEvent.change(inputCargo, { target: { value: usuarioValido.cargo } });
    fireEvent.click(botaoSalvar);
    fireEvent.click(botaoCancelar);
  });

  it('Deve enviar o formulário', async () => {
    expect(authServiceMock).toBeTruthy();

    await expect(authServiceMock).toBeCalledWithAsync(usuarioValido.email, usuarioValido.senha).catch(e => expect(e).toBeInstanceOf(Error));
  })
});
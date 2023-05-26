import { expect, describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from '../home';
import { AuthContext } from '../../contexts/auth/authContext';

describe('Home component', () => {
  let authContextMock;

  beforeEach(() => {
    authContextMock = {
      permissao: 'Superadmin',
    };

    // Mock da função que consulta o Firestore e define a permissão do usuário
    const consultaFirestoreMock = vi.fn().mockResolvedValue('Superadmin');

    render(
      <AuthContext.Provider value={authContextMock}>
        <Home consultaFirestore={consultaFirestoreMock} />
      </AuthContext.Provider>
    );
  });

  it('Deve renderizar o componente sem erros', () => {
    const inputNomeProduto = screen.getByPlaceholderText('Insira o nome do produto');
    expect(inputNomeProduto).toBeInTheDocument();

    const botaoAdicionarProduto = screen.getByText('Adicionar produto');
    expect(botaoAdicionarProduto).toBeInTheDocument();

    const tabelaProdutos = screen.getByRole('table');
    expect(tabelaProdutos).toBeInTheDocument();
  });

  it('Deve abrir o modal de adicionar produto', () => {
    const botaoAdicionarProduto = screen.getByText('Adicionar produto');
    fireEvent.click(botaoAdicionarProduto);

    const modalAdicionarProduto = screen.getByRole('dialog');
    expect(modalAdicionarProduto).toBeInTheDocument();
  });

  it('Deve filtrar os produtos por nome', () => {
    const inputNomeProduto = screen.getByPlaceholderText('Insira o nome do produto');
    fireEvent.change(inputNomeProduto, { target: { value: 'nome do produto' } });

    const tabelaProdutos = screen.getByRole('table');
    expect(tabelaProdutos).toBeInTheDocument();
    // Verificar se a tabela de produtos é atualizada com os produtos filtrados
  });
});

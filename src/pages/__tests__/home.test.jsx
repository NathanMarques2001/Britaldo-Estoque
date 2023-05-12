import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Home } from '../home';
import { AuthContext } from '../../contexts/auth/authContext';
import { ModalAdicionarProduto } from '../../components/modal/adicionar-produto';
import { TabelaProdutos } from '../../components/tabela-produtos';
import { Navbar } from '../../components/navbar';


describe('Home', () => {
  it('renders Navbar component', () => {
    render(<Home />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

describe('Home', () => {
  it('renders BotaoClaro component and calls abreModal function on click', () => {
    const { getByText } = render(<Home />);
    const addButton = getByText('Adicionar produto');
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

describe('Home', () => {
  it('renders TabelaProdutos component and filters by product name', () => {
    render(<Home />);
    const productRows = screen.getAllByRole('row').slice(1); // ignora a primeira linha (header)
    expect(productRows).toHaveLength(3);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'produto 1' } });
    expect(screen.getAllByRole('row').slice(1)).toHaveLength(1);
    expect(screen.getByText('produto 1')).toBeInTheDocument();
  });
});

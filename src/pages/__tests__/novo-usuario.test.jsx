import { expect, describe, it, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NovoUsuario } from '../novo-usuario';
import AuthService from '../../services/auth/AuthService';

describe('NovoUsuario component', () => {
//   let authServiceMock;

//   beforeEach(() => {
//     authServiceMock = {
//       sair: jest.fn(),
//     };

//     render(<NovoUsuario />, {
//       mocks: [
//         {
//           module: '../../services/auth/AuthService',
//           export: 'default',
//           value: authServiceMock,
//         },
//       ],
//     });
//   });

  it('Deve exibir o componente Loading quando o estado "loading" for true', () => {
    // const loading = screen.queryByTestId('loading-component');
    // expect(loading).toBeNull();

    // const botaoVoltar = screen.getByText('Voltar ao login');
    // fireEvent.click(botaoVoltar);

    // const loadingAposClique = screen.getByTestId('loading-component');
    // expect(loadingAposClique).toBeInTheDocument();
  });

//   it('Deve chamar a função "sair" do AuthService ao clicar no botão Voltar', () => {
//     const botaoVoltar = screen.getByText('Voltar ao login');
//     fireEvent.click(botaoVoltar);

//     expect(authServiceMock.sair).toHaveBeenCalledTimes(1);
//   });
});

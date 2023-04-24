import './style.css'
import Baixa from '../../assets/baixa.svg'
import Editar from '../../assets/editar.svg'
import Excluir from '../../assets/excluir.svg'
import { useEffect, useState } from 'react'

export function Tabela({ titulo2, titulo3, tabela }) {
  const [produtos, setProdutos] = useState([
    { nome: 'Produto 1', quantidade: 5, observacoes: 'Observacao 1' },
    { nome: 'Produto 2', quantidade: 10, observacoes: 'Observacao 2' },
    { nome: 'Produto 3', quantidade: 15, observacoes: 'Observacao 3' },
  ])

  const [usuarios, setUsuario] = useState([
    { nome: 'Usuário 1', email: 'email1@email.com', permissao: 'Permissao 1' },
    { nome: 'Usuário 2', email: 'email2@email.com', permissao: 'Permissao 2' },
    { nome: 'Usuário 3', email: 'email3@email.com', permissao: 'Permissao 3' },
  ])

  const data = tabela === 'produtos' ? produtos : usuarios;

  useEffect(() => {
    //Código que busca dados no banco
  }, [produtos, usuarios])

  return (
    <table id="tabela-produtos">
      <thead>
        <tr>
          <th>Nome</th>
          <th>{titulo2}</th>
          <th>{titulo3}</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.nome}</td>
            <td>{item.quantidade || item.email}</td>
            <td>{item.observacoes || item.permissao}</td>
            <td id="container-botao-tabela">
              {
                tabela === 'produtos' ? <button id="btn-baixa" className="botao-tabela">
                  <img src={Baixa} alt="" className="img-botao" id="img-baixa" />
                </button> : <></>
              }
              <button id="btn-editar" className="botao-tabela">
                <img src={Editar} alt="" className="img-botao" id="img-editar" />
              </button>
              <button id="btn-excluir" className="botao-tabela">
                <img src={Excluir} alt="" className="img-botao" id="img-excluir" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

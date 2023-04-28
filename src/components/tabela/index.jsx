import './style.css'
import Baixa from '../../assets/baixa.svg'
import Editar from '../../assets/editar.svg'
import Excluir from '../../assets/excluir.svg'
import { useEffect, useState } from 'react'
import UsersCollection from '../../services/firestore/UsersCollection'
import ProdutosCollection from '../../services/firestore/ProdutosCollection'
import { traduzPermissao } from '../../utils/formataDados.js'
import { Loading } from '../loading'

export function Tabela({ titulo2, titulo3, tabela }) {
  const [produtos, setProdutos] = useState([])
  const [usuarios, setUsuario] = useState([])
  const [loading, setLoading] = useState(false);

  const data = tabela === 'produtos' ? produtos : usuarios;

  const usersCollection = new UsersCollection();
  const produtosCollection = new ProdutosCollection();

  useEffect(() => {
    setLoading(true)
    usersCollection.get(setUsuario);
    produtosCollection.get(setProdutos);
    setLoading(false)
  }, [])

  return (
    <>
      {loading ? <Loading /> : <> </>}
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
              <td>{item.observacoes || traduzPermissao(item.permissao)}</td>
              <td id="container-botao-tabela">
                {
                  tabela === 'produtos' ? <button id="btn-baixa" className="botao-tabela">
                    <img src={Baixa} alt="" className="img-botao" id="img-baixa" />
                  </button> : <></>
                }
                <button id="btn-editar" className="botao-tabela">
                  <img src={Editar} alt="" className="img-botao" id="img-editar" />
                </button>
                {
                  item.permissao === 'Superadmin' ? <></> : <button id="btn-excluir" className="botao-tabela">
                    <img src={Excluir} alt="" className="img-botao" id="img-excluir" />
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

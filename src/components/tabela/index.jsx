import './style.css'
import Baixa from '../../assets/baixa.svg'
import Editar from '../../assets/editar.svg'
import Excluir from '../../assets/excluir.svg'
import { useEffect, useState } from 'react'
import UsersCollection from '../../services/firestore/UsersCollection'
import ProdutosCollection from '../../services/firestore/ProdutosCollection'
import { traduzPermissao } from '../../utils/formataDados.js'
import { ModalEditaUsuario } from '../modal/editar-usuario'
import { ModalEditaProduto } from '../modal/editar-produto'

export function Tabela({ titulo2, titulo3, tabela }) {
  const [produtos, setProdutos] = useState([{
    nome: '',
    quantidade: 0,
    observacoes: '',
    id: ''
  }])
  const [usuarios, setUsuarios] = useState([{
    nome: '',
    email: '',
    cargo: '',
    permissao: '',
    id: ''
  }])
  const [usuario, setUsuario] = useState({})
  const [produto, setProduto] = useState({})
  const [abrirUsuarios, setAbrirUsuarios] = useState(false)
  const [abrirProdutos, setAbrirProdutos] = useState(false)
  const [abrirBaixa, setAbrirBaixa] = useState(false)

  const data = tabela === 'produtos' ? produtos : usuarios;

  const usersCollection = new UsersCollection();
  const produtosCollection = new ProdutosCollection();

  function abreModal() {
    if (tabela === 'produtos') {
      setAbrirProdutos(true)
    } else {
      setAbrirUsuarios(true)
    }
  }

  function abreModalBaixa() {
    setAbrirBaixa(true)
  }

  function fechaModal() {
    if (tabela === 'produtos') {
      setAbrirProdutos(false)
    } else {
      setAbrirUsuarios(false)
    }
  }

  function fechaModalBaixa() {
    setAbrirBaixa(false)
  }

  useEffect(() => {
    if (tabela === 'produtos') {
      produtosCollection.get(setProdutos);
    } else {
      usersCollection.get(setUsuarios);
    }
  }, [])

  return (
    <>
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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>{item.quantidade || item.email}</td>
              <td>{item.observacoes || traduzPermissao(item.permissao)}</td>
              <td id="container-botao-tabela">
                {
                  tabela === 'produtos' ? <button onClick={async () => {
                    try {
                      const product = await produtosCollection.getProduto(item.id);
                      setProduto(product);
                      abreModalBaixa();
                    } catch (error) {
                      console.log(error);
                    }
                  }} id="btn-baixa" className="botao-tabela">
                    <img src={Baixa} alt="" className="img-botao" id="img-baixa" />
                  </button> : <></>
                }
                {abrirBaixa &&
                  <ModalEditaProduto
                    abrir={abrirBaixa}
                    fechar={fechaModalBaixa}
                    nome={produto.nome}
                    quantidade={produto.quantidade}
                    observacoes={produto.observacoes}
                    id={produto.id}
                    modalBaixa={true}
                  />}
                <button onClick={async () => {
                  try {
                    if (tabela === 'produtos') {
                      const product = await produtosCollection.getProduto(item.id);
                      setProduto(product);
                    } else {
                      const user = await usersCollection.getUser(item.id);
                      setUsuario(user);
                    }
                    abreModal();
                  } catch (error) {
                    console.log(error);
                  }
                }} id="btn-editar" className="botao-tabela">
                  <img src={Editar} alt="" className="img-botao" id="img-editar" />
                </button>
                {abrirUsuarios ?
                  <ModalEditaUsuario
                    abrir={abrirUsuarios}
                    fechar={fechaModal}
                    nome={usuario.nome}
                    email={usuario.email}
                    cargo={usuario.cargo}
                    permissao={usuario.permissao}
                    id={usuario.id}
                  /> : <></>}
                {abrirProdutos ?
                  <ModalEditaProduto
                    abrir={abrirProdutos}
                    fechar={fechaModal}
                    nome={produto.nome}
                    quantidade={produto.quantidade}
                    observacoes={produto.observacoes}
                    id={produto.id}
                    modalBaixa={false}
                  /> : <></>
                }
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

import './style.css'
import Editar from '../../assets/editar.svg'
import Excluir from '../../assets/excluir.svg'
import { useEffect, useState } from 'react'
import UsersCollection from '../../services/firestore/UsersCollection'
import { traduzPermissao } from '../../utils/formataDados.js'
import { Loading } from '../loading'
import { ModalEditaUsuario } from '../modal/editar-usuario'

export function TabelaUsuarios({ permissao }) {
  const [usuarios, setUsuarios] = useState([{
    nome: '',
    email: '',
    cargo: '',
    permissao: '',
    id: ''
  }])
  const [usuario, setUsuario] = useState({})
  const [abrirUsuarios, setAbrirUsuarios] = useState(false)
  const [loading, setLoading] = useState(false)

  const usersCollection = new UsersCollection();

  function abreModal() {
    setLoading(true)
    setAbrirUsuarios(true)
    setLoading(false)
  }

  function fechaModal() {
    setAbrirUsuarios(false)
  }

  useEffect(() => {
    setLoading(true);
    usersCollection.get((usuarios) => {
      setUsuarios(usuarios.sort((a, b) => {
        if (a.nome < b.nome) {
          return -1;
        }
        if (a.nome > b.nome) {
          return 1;
        }
        return 0;
      }));
      setLoading(false);
    });
  }, []);


  return (
    <>
      {loading && <Loading />}
      <table id="tabela-produtos">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Permissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>{item.email}</td>
              <td>{traduzPermissao(item.permissao)}</td>
              <td id="container-botao-tabela">
                <button onClick={async () => {
                  if (permissao === 'Superadmin' || permissao === 'Admin') {
                    try {
                      const user = await usersCollection.getUser(item.id);
                      setUsuario(user);
                      abreModal();
                    } catch (error) {
                      console.log(error);
                    }
                  } else {
                    alert("Não é admin")
                  }
                }} id="btn-editar" className="botao-tabela">
                  <img src={Editar} alt="" className="img-botao" id="img-editar" />
                </button>
                {abrirUsuarios &&
                  <ModalEditaUsuario
                    abrir={abrirUsuarios}
                    fechar={fechaModal}
                    nome={usuario.nome}
                    email={usuario.email}
                    cargo={usuario.cargo}
                    permissao={usuario.permissao}
                    id={usuario.id}
                    superadmin={permissao}
                  />}
                {
                  item.permissao === 'Superadmin' ? <></> : <button onClick={async () => {
                    if (permissao === 'Superadmin' || permissao === 'Admin') {
                      alert("Função que exclui")
                    } else {
                      alert("Não é admin")
                    }
                  }} id="btn-excluir" className="botao-tabela">
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

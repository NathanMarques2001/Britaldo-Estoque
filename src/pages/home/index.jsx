//componentes
import { Tabela } from '../../components/tabela'
import { Navbar } from '../../components/navbar'
import { BotaoClaro } from '../../components/button/botao-claro'
//funções,variaveis e estilos
import './style.css'
import UsersCollection from '../../services/firestore/UsersCollection'
import { useAuthContext } from '../../contexts/auth/authContext'
import { useEffect, useState } from 'react'
import { NovoUsuario } from '../novo-usuario'
import { ModalAdicionarProduto } from '../../components/modal/adicionar-produto'

export function Home() {
  const [abrir, setAbrir] = useState(false)
  const [validaNovo, setValidaNovo] = useState(false)
  const [nomeFiltro, setFiltroNome] = useState("")
  const { user } = useAuthContext()
  const usersCollection = new UsersCollection()

  useEffect(() => {
    usersCollection.validaPermissao(user.uid).then((response) => response ? setValidaNovo(false) : setValidaNovo(true)).catch((error) => error)
  }, [])

  function abreModal() {
    setAbrir(true)
  }

  function fechaModal() {
    setAbrir(false)
  }

  function atualizaFiltro(event) {
    setFiltroNome(event.target.value);
  }

  const lowerFiltro = nomeFiltro.toLowerCase();

  return (
    <>
      {validaNovo ? <NovoUsuario /> : <></>}
      {abrir ? <ModalAdicionarProduto abrir={abrir} fechar={fechaModal} /> : <></>}
      <Navbar />
      <div id="container-home">
        <BotaoClaro texto="Adicionar produto" abreModal={abreModal} />
        <input
          type="search"
          name="nome-produto"
          id="busca-nome-produto"
          placeholder="Insira o nome do produto"
          value={nomeFiltro}
          onChange={atualizaFiltro}
        />

        <Tabela
          titulo2="Quantidade"
          titulo3="Observações"
          tabela="produtos"
          filtro={lowerFiltro}
        />
      </div>
    </>
  )
}

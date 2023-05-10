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
        />
        <Tabela
          titulo2="Quantidade"
          titulo3="Observações"
          tabela="produtos"
        />
      </div>
    </>
  )
}

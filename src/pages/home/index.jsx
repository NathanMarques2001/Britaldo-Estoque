//componentes
import { Tabela } from '../../components/tabela'
import { Navbar } from '../../components/navbar'
import { BotaoClaro } from '../../components/button/botao-claro'
//funções,variaveis e estilos
import './style.css'
import UsersCollection from '../../services/firestore/UsersCollection'
import { useAuthContext } from '../../contexts/auth/authContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { NovoUsuario } from '../novo-usuario'

export function Home() {
  const navigate = useNavigate()
  const [validaNovo, setValidaNovo] = useState(false)
  const { user } = useAuthContext()
  new UsersCollection().validaPermissao(user.uid).then(() => setValidaNovo(true)).catch((error) => error)

  return (
    <>
      {validaNovo ? <NovoUsuario /> : <></>}
      <Navbar />
      <div id="container-home">
        <BotaoClaro texto="Adicionar produto" />
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

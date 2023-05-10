//componetes
import { Tabela } from '../../components/tabela'
import { Navbar } from '../../components/navbar'
//funções,variaveis e estilos
import './style.css'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/auth/authContext'
import UsersCollection from '../../services/firestore/UsersCollection'
import { NovoUsuario } from '../novo-usuario'

export function Usuarios() {
  const [validaNovo, setValidaNovo] = useState(false)
  const { user } = useAuthContext()
  const usersCollection = new UsersCollection()
  useEffect(() => {
    usersCollection.validaPermissao(user.uid).then((response) => response ? setValidaNovo(false) : setValidaNovo(true)).catch((error) => error)
  }, [])
  return (
    <>
      {validaNovo ? <NovoUsuario /> : <></>}
      <Navbar />
      <div id="users-container">
        <Tabela
          titulo2="Email"
          titulo3="Permissões"
          tabela="usuarios"
        />
      </div>
    </>
  )
}

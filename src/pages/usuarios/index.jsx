//componetes
import { TabelaUsuarios } from '../../components/tabela-usuarios'
import { Navbar } from '../../components/navbar'
//funções,variaveis e estilos
import './style.css'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/auth/authContext'
import { NovoUsuario } from '../novo-usuario'

export function Usuarios() {
  const [validaNovo, setValidaNovo] = useState(false)
  const { permissao } = useAuthContext()

  useEffect(() => {
    if (permissao === 'New User') {
      setValidaNovo(true);
    } else {
      setValidaNovo(false)
    }
  }, [permissao])

  return (
    <>
      {validaNovo && <NovoUsuario />}
      <Navbar />
      <div id="users-container">
        <TabelaUsuarios permissao={permissao} />
      </div>
    </>
  )
}

//componetes
import { Tabela } from '../../components/tabela'
import { Navbar } from '../../components/navbar'
//funções,variaveis e estilos
import './style.css'

export function Usuarios() {

  return (
    <>
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

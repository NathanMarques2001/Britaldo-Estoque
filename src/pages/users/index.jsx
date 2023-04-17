import { Table } from '../../components/table'
import { Navbar } from '../../components/navbar'
import { LightButton } from '../../components/button/light-button'

import './style.css'

export function Users() {
  return (
    <>
      <Navbar />
      <div id="users-container">
        <LightButton text="Adicionar usuário" />
        <Table
          titulo2="Email ou Usuário"
          titulo3="Observações"
          quantidadeBotoes={2}
        />
      </div>
    </>
  )
}

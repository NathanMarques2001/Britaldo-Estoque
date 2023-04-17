import './style.css'
import { Table } from '../../components/table'
import { Navbar } from '../../components/navbar'

export function Users() {
  return (
    <>
      <Navbar />
      <div id='users-container'>
        <button id="botaouser">Adicionar Usuário</button>
        <Table titulo2="Email ou Usuário" titulo3="Observações" quantidadeBotoes={2} />
      </div>
    </>
  )
}

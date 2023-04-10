import './style.css'
import { Table2 } from '../../components/table2'
import { Navbar } from '../../components/navbar'

export function Users() {
  return (
    <>
      <Navbar />
      <div id='users-container'>
        <button id="botaouser">Adicionar Usuário</button>
        <Table2 titulo2="Email ou Usuário" titulo3="Observações" quantidadeBotoes={2} />
      </div>
    </>
  )
}

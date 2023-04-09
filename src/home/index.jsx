import './style.css'
import { Navbar } from '../components/navbar'
import { Table } from '../components/table'

export function Home() {
  return (
    <>
      <Navbar />
      <div id="container-home">
        <button id="botao-add">Adicionar produto</button>
        <input
          type="search"
          name="nome-produto"
          id="busca-nome-produto"
          placeholder="Insira o nome do produto"
        />
        <Table
          titulo2="Quantidade"
          titulo3="Observações"
          quantidadeBotoes={3}
        />
      </div>
    </>
  )
}

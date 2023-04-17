import { Table } from '../../components/table'
import { Navbar } from '../../components/navbar'
import { LightButton } from '../../components/button/light-button'

import './style.css'

export function Home() {
  return (
    <>
      <Navbar />
      <div id="container-home">
        <LightButton text="Adicionar produto" />
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

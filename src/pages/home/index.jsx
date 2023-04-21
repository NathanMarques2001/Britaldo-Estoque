//componentes
import { Tabela } from '../../components/tabela'
import { Navbar } from '../../components/navbar'
import { BotaoClaro } from '../../components/button/botao-claro'
//funções,variaveis e estilos
import './style.css'

export function Home() {

  return (
    <>
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
          quantidadeBotoes={3}
        />
      </div>
    </>
  )
}

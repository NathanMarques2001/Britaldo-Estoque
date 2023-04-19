//bibliotecas
import { useState } from 'react'
//componetes
import { Tabela } from '../../components/tabela'
import { Navbar } from '../../components/navbar'
import { BotaoClaro } from '../../components/button/botao-claro'
import { ModalAdicionaUsuario } from '../../components/modal/user'
//funções,variaveis e estilos
import './style.css'

export function Usuarios() {
  const [abrir, setAbrir] = useState(false)

  function abreModal() {
    setAbrir(true);
  }

  function fechaModal() {
    setAbrir(false);
  }

  return (
    <>
      <Navbar />
      {abrir ? <ModalAdicionaUsuario abrir={abrir} fechar={fechaModal} /> : <></>}
      <div id="users-container">
        <BotaoClaro texto="Adicionar usuário" abreModal={abreModal} />
        <Tabela
          titulo2="Email ou Usuário"
          titulo3="Observações"
          quantidadeBotoes={2}
        />
      </div>
    </>
  )
}

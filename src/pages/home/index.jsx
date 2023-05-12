//componentes
import { TabelaProdutos } from '../../components/tabela-produtos'
import { Navbar } from '../../components/navbar'
import { BotaoClaro } from '../../components/button/botao-claro'
//funções,variaveis e estilos
import './style.css'
import { useAuthContext } from '../../contexts/auth/authContext'
import { useEffect, useState } from 'react'
import { NovoUsuario } from '../novo-usuario'
import { ModalAdicionarProduto } from '../../components/modal/adicionar-produto'

export function Home() {
  const [abrir, setAbrir] = useState(false)
  const [validaNovo, setValidaNovo] = useState(false)
  const [nomeFiltro, setFiltroNome] = useState("")
  const { permissao } = useAuthContext()

  useEffect(() => {
    if (permissao === 'New User') {
      setValidaNovo(true);
    } else {
      setValidaNovo(false)
    }
  }, [permissao])

  function abreModal() {
    if (permissao === 'Superadmin' || permissao === 'Admin') {
      setAbrir(true)
    } else {
      alert("Não é admin")
    }
  }

  function fechaModal() {
    setAbrir(false)
  }

  function atualizaFiltro(event) {
    setFiltroNome(event.target.value);
  }

  const lowerFiltro = nomeFiltro.toLowerCase();

  return (
    <>
      {validaNovo && <NovoUsuario />}
      {abrir ? <ModalAdicionarProduto abrir={abrir} fechar={fechaModal} /> : <></>}
      <Navbar />
      <div id="container-home">
        <BotaoClaro texto="Adicionar produto" abreModal={abreModal} />
        <input
          type="search"
          name="nome-produto"
          id="busca-nome-produto"
          placeholder="Insira o nome do produto"
          value={nomeFiltro}
          onChange={atualizaFiltro}
        />

        <TabelaProdutos
          filtro={lowerFiltro}
          permissao={permissao}
        />
      </div>
    </>
  )
}

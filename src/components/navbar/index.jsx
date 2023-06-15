import './style.css'
import Logo from '../../assets/logo-branca.svg'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth/AuthService'
import { Loading } from '../loading'
import { useState } from 'react'
import { PopUp } from '../pop-up'

export function Navbar() {
  const [loading, setLoading] = useState(false)
  const [abrir, setAbrir] = useState(false)
  const authService = new AuthService()

  function abreModal() {
    setAbrir(true)
  }

  function fechaModal() {
    setAbrir(false)
  }

  const logout = () => {
    setLoading(true)
    authService
      .sair()
      .then(() => {
        window.location.reload()
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  return (
    <>
      {loading ? <Loading /> : <></>}
      <PopUp
        abrir={abrir}
        fechar={fechaModal}
        mensagem="Você tem certeza de que deseja sair?"
        quantidadeBotoes={2}
        botao1="Sim"
        botao2="Não"
        operacao={logout} />

      <nav id="container-navbar">
        <img src={Logo} alt="logo-nav" id="logo-nav" />
        <div id='container-links-navbar'>
          <div id="links-navbar">
            <Link to="/" className="link-nav">
              Estoque
            </Link>
            <Link to="/usuarios" className="link-nav">
              Usuários
            </Link>
            <p className="link-nav a-nav" onClick={abreModal}>
              Sair
            </p>
          </div>
        </div>
      </nav>
    </>
  )
}

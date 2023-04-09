import './style.css'
import Logo from '../../assets/logo-branca.svg'

export function Navbar() {
  return (
    <nav id="container-navbar">
      <img src={Logo} alt="logo-nav" id="logo-nav" />
      <div id="links-navbar">
        <p className="link-nav">Estoque</p>
        <p className="link-nav">Usuários</p>
        <p className="link-nav">Sair</p>
      </div>
    </nav>
  )
}

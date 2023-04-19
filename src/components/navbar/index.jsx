import './style.css'
import Logo from '../../assets/logo-branca.svg'
import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <nav id="container-navbar">
      <img src={Logo} alt="logo-nav" id="logo-nav" />
      <div id="links-navbar">
        <Link to="/home" className="link-nav">Estoque</Link>
        <Link to="/usuarios" className="link-nav">Usuários</Link>
        <Link to="/" className="link-nav">Sair</Link>
      </div>
    </nav>
  )
}

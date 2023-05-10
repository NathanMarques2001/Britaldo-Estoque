import './style.css'
import Logo from '../../assets/logo-branca.svg'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth/AuthService'
import { Loading } from '../loading'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Navbar() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const logout = () => {
    setLoading(true)
    new AuthService()
      .sair()
      .then(() => {
        setLoading(false)
        navigate('/login')
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  return (
    <>
      {loading ? <Loading /> : <></>}
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
            <p className="link-nav a-nav" onClick={logout}>
              Sair
            </p>
          </div>
        </div>
      </nav>
    </>
  )
}

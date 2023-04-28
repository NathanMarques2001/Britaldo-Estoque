import './style.css'
import imgNovoUsuario from '../../assets/Server-rafiki.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Loading } from '../../components/loading'
import AuthService from '../../services/auth/AuthService'

export function NovoUsuario() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  function voltarAoLogin() {
    setLoading(true)
    new AuthService()
      .sair()
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  return (
    <>
      {loading ? <Loading /> : <></>}
      <div id='container-novo-usuario'>
        <img src={imgNovoUsuario} alt="" id='img-novo-usuario' />
        <div id='texto-novo-usuario'>
          <h1>Opa!</h1>
          <h3>Parece que você ainda não tem permissão para entrar!</h3>
          <h3>Peça ao administrador do sistema que libere seu acesso.</h3>
          <div id='container-botao-novo-usuario'>
            <button onClick={voltarAoLogin} id="botao-novo-usuario">Voltar ao login</button>
          </div>
        </div>
      </div>
    </>
  )
}
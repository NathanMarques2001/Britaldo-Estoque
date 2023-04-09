import './style.css'
import ImgLogin from '../../assets/rafiki.svg'
import ImgLogo from '../../assets/logo-preta.svg'
import { signIn } from '../../services/signIn'
import { useState } from 'react'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    signIn(email, password)
  }

  return (
    <div id="body-login">
      <div id="container-login">
        <img src={ImgLogo} id="ImgLogo" />
        <form onSubmit={handleSubmit} id="form-login">
          <label for="login" className="label-login" id="label-user">
            Login
          </label>
          <input
            type="text"
            name="login"
            placeholder="Nome de usuário ou e-mail"
            className="input-login"
            id="input-user"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="senha" className="label-login" id="label-senha">
            Senha
          </label>
          <input
            type="password"
            name="senha"
            placeholder="Insira sua senha"
            className="input-login"
            id="input-senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button id="botao-login">Login</button>
        </form>
      </div>
      <img src={ImgLogin} id="ImgLogin" />
    </div>
  )
}

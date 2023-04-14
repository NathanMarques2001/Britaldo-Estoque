import './style.css'
import ImgLogin from '../../assets/rafiki.svg'
import ImgLogo from '../../assets/logo-preta.svg'
import { signIn } from '../../services/firebaseFunctions'
import { useState } from 'react'
import { validateEmail, validatePassword } from '../../utils/regex'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    
    if (validateEmail(email) && validatePassword(password)) {
      signIn(email, password)
    } else if (!validateEmail(email)) {
      console.log(
        'email invalido! Favor inserir um e-mail válido. Ex: email@email.com',
      )
    } else if (!validatePassword(password)) {
      console.log(
        'senha invalida! Favor inserir uma senha com no minimo 6 digitos!',
      )
    } else {
      console.log('email e senha inválidos!')
    }
  }

  return (
    <div id="body-login">
      <div id="container-login">
        <img src={ImgLogo} id="ImgLogo" />
        <form onSubmit={handleSubmit} id="form-login">
          <label htmlFor="login" className="label-login" id="label-user">
            Login
          </label>
          <input
            type="email"
            name="login"
            placeholder="Nome de usuário ou e-mail"
            className="input-login"
            id="input-user"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="senha" className="label-login" id="label-senha">
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

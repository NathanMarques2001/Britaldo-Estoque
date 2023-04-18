import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { DarkButton } from '../../components/button/dark-button'
import ImgLogin from '../../assets/rafiki.svg'
import ImgLogo from '../../assets/logo-preta.svg'

import { validateEmail, validatePassword } from '../../utils/regex'
import { auth } from '../../services/firebaseFunctions'
import './style.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (validateEmail(email) && validatePassword(password)) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          navigate('/home')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
        })
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
          <p>funciona!</p>
          <DarkButton text="Entrar" idName="button-login" />
        </form>
      </div>
      <img src={ImgLogin} id="ImgLogin" />
    </div>
  )
}

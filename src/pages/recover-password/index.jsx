import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'

import imgForgotPassword from '../../assets/Forgot-password.svg'
import { Loading } from '../../components/loading'

import './style.css'
import { validateEmail } from '../../utils/regex'
import { auth } from '../../services/firebaseFunctions'

export function RecoverPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (validateEmail(email)) {
      setLoading(true)
      sendPasswordResetEmail(auth, email)
        .then((response) => {
          console.log('Email enviado com sucesso')
          setEmail('')
          setLoading(false)
        })
        .catch((error) => {
          if (error.code == 'auth/user-not-found') {
            console.error('Usuário não encontrado')
            setLoading(false)
          }
        })
    }
    if (email == '') {
      setLoading(false)
    }
  }

  return (
    <div id="recoverPassword-container">
      {loading ? <Loading /> : <></>}
      <img
        src={imgForgotPassword}
        alt="Imagem esqueci a senha"
        id="recoverPassword-img"
      />
      <form onSubmit={handleSubmit} id="recoverPassword-form">
        <label htmlFor="recover-email" id="recoverPassword-label">
          <h3>Insira seu e-mail</h3>
        </label>
        <div id="recoverPassword-div-texto">
          <p>
            Enviaremos um e-mail com as instruções de recuperação de senha para
            o endereço fornecido.
          </p>
        </div>
        <div id="recoverPassword-div-input">
          <input
            type="email"
            name="recover-email"
            id="recoverPassword-input"
            placeholder="Ex: Email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div id="recoverPassword-div-button">
          <button onClick={(e) => navigate('/')} id="button-cancel">
            Cancelar
          </button>
          <button id="button-send">Enviar</button>
        </div>
      </form>
    </div>
  )
}

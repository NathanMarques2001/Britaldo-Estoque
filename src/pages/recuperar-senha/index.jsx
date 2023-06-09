//bibliotecas
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//componentes
import imgForgotPassword from '../../assets/Forgot-password.svg'
import { Loading } from '../../components/loading'
//funções,variaveis e estilos
import './style.css'
import { validaEmail } from '../../utils/regex'
import AuthService from '../../services/auth/AuthService'
import { PopUp } from '../../components/pop-up'

export function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const authService = new AuthService()
  const [abrePopUp, setAbrePopUp] = useState(false)

  function fechaPopUp(){
    setAbrePopUp(false)
    navigate("/login")
  }
  //Função que envia o formulário
  function handleSubmit(event) {
    setLoading(true)
    event.preventDefault()

    if (validaEmail(email)) {
      authService.recuperarSenha(email)
        .then((response) => {
          console.log('Email enviado com sucesso')
          setEmail('')
          setAbrePopUp(true)
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
      {loading && <Loading />}
      <PopUp 
      abrir={abrePopUp}
      fechar={fechaPopUp}
      mensagem="E-mail enviado com sucesso! Favor verificar sua caixa de emtrada."
      quantidadeBotoes={1}
      botao1="OK"
      operacao={fechaPopUp}
      />
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
            required
            id="recoverPassword-input"
            placeholder="Ex: Email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div id="recoverPassword-div-button">
          <button onClick={(e) => navigate('/login')} id="button-cancel">
            Cancelar
          </button>
          <button id="button-send">Enviar</button>
        </div>
      </form>
    </div>
  )
}

//bibliotecas
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
//componentes
import { BotaoEscuro } from '../../components/button/botao-escuro'
import ImgLogin from '../../assets/rafiki.svg'
import ImgLogo from '../../assets/logo-preta.svg'
import { Loading } from '../../components/loading'
//funções,variaveis e estilos
import { validaEmail, validaSenha } from '../../utils/regex'
import { auth } from '../../services/firebaseConfig.js'
import './style.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  //Função que envia o formulário
  function enviaFormulario(event) {
    setLoading(true)

    event.preventDefault()

    if (validaEmail(email) && validaSenha(senha)) {
      signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          const user = userCredential.user
          navigate('/home')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }

  onAuthStateChanged(auth, function (user) {
    if (user) {
      navigate('/home')
    }
  })

  return (
    <div id="body-login">
      {loading ? <Loading /> : <></>}
      <div id="container-login">
        <img src={ImgLogo} id="ImgLogo" />
        <form onSubmit={enviaFormulario} id="form-login">
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <BotaoEscuro texto="Entrar" idName="button-login" />
        </form>
      </div>
      <img src={ImgLogin} id="ImgLogin" />
    </div>
  )
}

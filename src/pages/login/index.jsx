//bibliotecas
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//componentes
import { BotaoEscuro } from '../../components/button/botao-escuro'
import ImgLogin from '../../assets/rafiki.svg'
import ImgLogo from '../../assets/logo-preta.svg'
import { Loading } from '../../components/loading'
//funções,variaveis e estilos
import { validaEmail, validaSenha } from '../../utils/regex'
import './style.css'
import AuthService from '../../services/AuthService'

export function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    senha: '',
  })

  const atualizaEmail = (event) => {
    setForm({
      ...form,
      email: event.target.value,
    })
  }

  const atualizaSenha = (event) => {
    setForm({
      ...form,
      senha: event.target.value,
    })
  }

  function enviaFormulario(event) {
    event.preventDefault()

    if (validaEmail(form.email) && validaSenha(form.senha)) {
      setLoading(true)

      new AuthService()
        .logar(form.email, form.senha)
        .then(() => {
          setLoading(false)
          navigate('/home')
        })
        .catch((error) => {
          setLoading(false)
          setError(error)
        })
    }
  }

  return (
    <>
      {loading ? <Loading /> : <></>}
      <div id="body-login">
        <div id="container-login">
          <img src={ImgLogo} id="ImgLogo" />
          <form onSubmit={enviaFormulario} id="form-login">
            <label htmlFor="login" className="label-login" id="label-user">
              Login
            </label>
            <input
              type="email"
              name="login"
              placeholder="Insira seu e-mail"
              className="input-login"
              id="input-user"
              value={form.email}
              onChange={atualizaEmail}
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
              value={form.senha}
              onChange={atualizaSenha}
            />
            <BotaoEscuro texto="Entrar" />
          </form>
        </div>
        <img src={ImgLogin} id="ImgLogin" />
      </div>
    </>
  )
}

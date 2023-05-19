//bibliotecas
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
//componentes
import { BotaoEscuro } from '../../components/button/botao-escuro'
import ImgLogin from '../../assets/rafiki.svg'
import ImgLogo from '../../assets/logo-preta.svg'
import { Loading } from '../../components/loading'
//funções,variaveis e estilos
import { validaEmail, validaSenha } from '../../utils/regex'
import './style.css'
import AuthService from '../../services/auth/AuthService'

export function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    senha: '',
  })
  const authService = new AuthService();

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

      authService
        .logar(form.email, form.senha)
        .then((response) => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false)
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
          <button id='botao-criar-conta' onClick={e => navigate("/cadastro")}>Criar conta</button>
          <Link className='label-login' to='/recuperar-senha'>Esqueceu sua senha?</Link>
        </div>
        <img src={ImgLogin} id="ImgLogin" alt='imagem-login' />
      </div>
    </>
  )
}

import './style.css'
import ImgLogin from '../assets/rafiki.svg'
import ImgLogo from '../assets/logo-preta.svg'

export function Login() {
  return (
    <div id="body-login">
      <div id="container-login">
        <img src={ImgLogo} id="ImgLogo" />
        <form id="form-login">
          <label for="login" className="label-login" id="label-user">
            Login
          </label>
          <input
            type="text"
            name="login"
            placeholder="Nome de usuário ou e-mail"
            className="input-login"
            id="input-user"
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
          />
          <button type="submit" id="botao-login">
            Login
          </button>
        </form>
      </div>
      <img src={ImgLogin} id="ImgLogin" />
    </div>
  )
}

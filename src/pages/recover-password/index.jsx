import './style.css'
import imgForgotPassword from '../../assets/Forgot-password.svg'

export function RecoverPassword() {
  return (
    <div id="recoverPassword-container">
      <img
        src={imgForgotPassword}
        alt="Imagem esqueci a senha"
        id="recoverPassword-img"
      />
      <form onSubmit="" id="recoverPassword-form">
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
          />
        </div>
        <div id="recoverPassword-div-button">
          <button>Cancelar</button>
          <button>Enviar</button>
        </div>
      </form>
    </div>
  )
}

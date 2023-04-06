import './style.css'

export function Login() {

  return (
    <div>
      {<div>
          <div>
          <div>
            <img src="assets/logo-preta.svg"></img>
          </div>
          <form>
            <label for="login">Login</label>
            <input type="text" id="login" name="login"></input>
            <label for="senha">Senha</label>
            <input type="password" id="senha" name="senha"></input>
            <button type="submit">Login</button>
          </form>
        </div>
        <div>
          <img src="assets/rafiki.svg"></img>
        </div>
      </div>}
    </div>
  )
}

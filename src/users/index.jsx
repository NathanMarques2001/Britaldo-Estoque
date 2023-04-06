import './style.css'

export function Users() {

  return (
    <div>
      <div class="cabecalho">
          <img src="assets/logo-preta.svg"></img>
          <p>Estoque</p>
          <p>Usuários</p>
          <p>Sair</p>
        </div>

        <div>
          <button type="submit">Adicionar Usuário</button>
        </div>

        <div class="usuarios">
          <h2>Nome</h2>
          <h2>E-mail ou Usuário</h2>
          <h2>Permissões</h2>
          <h2>Ações</h2>
        </div>

        <div>
            <p>usuário</p>
            <p>Usuário@email.com</p>
            <p>Administrador</p>s
            <img src="assets/editar.svg"></img>
            <img src="assets/excluir.svg"></img>
          </div>
    </div>
  )
}

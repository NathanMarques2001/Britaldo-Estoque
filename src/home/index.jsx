import './style.css'

export function Home() {
  return (
    <div>
      <div class="home">
        <div class="cabecalho">
          <img src="../assets/logo-preta.svg"></img>
          <div>
            <p>Estoque</p>
            <p>Usuários</p>
            <p>Sair</p>
          </div>
        </div>
        <button type="submit">Adicionar produto</button>
        <label for="produto">Insira o nome do produto</label>
        <div class="tabela">
          <input
            type="text"
            id="produto"
            name="Insira o nome do produto"
          ></input>
        </div>
        <div class="produtos">
          <h2>Nome</h2>
          <h2>Quantidade</h2>
          <h2>Observações</h2>
          <h2>Ações</h2>

          <div>
            <p>Papel A4 com 500 Unidades</p>
            <p>5</p>
            <p>Papel branco</p>
            <img src="assets/baixa.svg"></img>
            <img src="assets/editar.svg"></img>
            <img src="assets/excluir.svg"></img>
          </div>

          <div>
            <p>Papel A4 com 500 Unidades</p>
            <p>5</p>
            <p>Papel branco</p>
            <img src="assets/baixa.svg"></img>
            <img src="assets/editar.svg"></img>
            <img src="assets/excluir.svg"></img>
          </div>

          <div>
            <p>Papel A4 com 500 Unidades</p>
            <p>5</p>
            <p>Papel branco</p>
            <img src="assets/baixa.svg"></img>
            <img src="assets/editar.svg"></img>
            <img src="assets/excluir.svg"></img>
          </div>
        </div>
      </div>
    </div>
  )
}

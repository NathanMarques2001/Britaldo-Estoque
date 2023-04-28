//bibliotecas
import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import { RxCross1 } from 'react-icons/rx'
import { useState } from 'react'
//componentes
import { Loading } from '../../loading'
import { BotaoEscuro } from '../../button/botao-escuro'
//funções,variaveis e estilos
import './style.css'

export function ModalAdicionaUsuario({ abrir, fechar, nome, setNome, email, cargo, setCargo, permissao, setPermissao }) {
  const [form, setForm] = useState({
    nome: nome,
    email: email,
    cargo: cargo,
    permissao: permissao,
    opcoes: [
      { value: '', label: '' },
      { value: 'Admin', label: 'Administrador' },
      { value: 'User', label: 'Usuário' },
      { value: 'New User', label: 'Novo Usuário' },
    ],
  })

  const [loading, setLoading] = useState(false)

  const reiniciaFormulario = () => {
    setForm({
      nome: '',
      cargo: '',
      permissao: '',
      opcao: '',
    })
  }

  const enviaFormulario = (event) => {
    event.preventDefault()

  }

  const [desabilita, setDesabilita] = useState(false)
  permissao === "Superadmin" ? setDesabilita(true) : setDesabilita(false)

  return (
    <>
      {loading ? <Loading /> : <></>}
      <Dialog open={abrir}>
        <DialogContent>
          <div id="background-modalUser">
            <div id="container-modalUser">
              <div id="container-icone-modalUser">
                <span id="icone-modalUser" onClick={fechar}>
                  <RxCross1 />
                </span>
              </div>
              <div id="container-titulo-modalUser">
                <h3 id="modalUser-titulo">Insira os dados do usuário</h3>
              </div>
              <form onSubmit={enviaFormulario} id="modalUser-form">
                <div className="label-input-modalUser">
                  <label htmlFor="modalUser-nome">Nome</label>
                  <input
                    type="text"
                    id="modalUser-nome"
                    className="input-ModalUser"
                    placeholder="Insira o nome do usuário"
                    required
                    value={form.nome}
                    onChange={setNome}
                  />
                </div>

                <div className="label-input-modalUser">
                  <label htmlFor="modalUser-email">E-mail</label>
                  <input
                    type="email"
                    id="modalUser-email"
                    className="input-ModalUser"
                    placeholder="Ex: email@email.com"
                    disabled
                    value={form.email}
                  />
                </div>

                <div className="label-input-modalUser">
                  <label htmlFor="modalUser-permissoes">Permissões</label>
                  <select
                    name="permissoes"
                    id="modalUser-permissoes"
                    className="input-ModalUser"
                    disabled={desabilita}
                    required
                    value={form.permissao}
                    onChange={setPermissao}
                  >
                    {form.opcoes.map((itens) => (
                      <option key={itens.value} value={itens.value}>
                        {itens.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="label-input-modalUser">
                  <label htmlFor="modalUser-cargo">Cargo</label>
                  <input
                    type="text"
                    id="modalUser-cargo"
                    className="input-ModalUser"
                    placeholder="Insira o cargo"
                    required
                    value={form.cargo}
                    onChange={setCargo}
                  />
                </div>
                <div className="label-input-modalUser" id='container-botao-modalUser'>
                  <BotaoEscuro texto="Salvar" />
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

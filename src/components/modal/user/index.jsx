import { Dialog, DialogTrigger, DialogContent } from '@radix-ui/react-dialog'
import { useState } from 'react'
import './style.css'
import { DarkButton } from '../../button/dark-button'

export function AddUserModal() {
  const [open, setOpen] = useState(true)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [cargo, setCargo] = useState('')
  const [permissao, setPermissao] = useState('')
  const [opcoes, setOpcoes] = useState([
    { value: '', label: '' },
    { value: 'Admin', label: 'Administrador' },
    { value: 'User', label: 'Usuário' },
  ])

  const handleSubmit = (event) => {
    event.preventDefault()
    // Implemente aqui a lógica para enviar as informações do modal
    const user = {
      Nome: nome,
      Email: email,
      Senha: senha,
      Cargo: cargo,
      Permissão: permissao,
    }
    console.log(user)

    setNome('')
    setEmail('')
    setSenha('')
    setCargo('')
    setPermissao('')
    // Fecha o modal
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogContent>
      <div id='background-modalUser'>
        <div id="container-modalUser">
          <div id="container-titlo-modalUser">
            <h3 id="modalUser-titulo">Insira os dados do usuário</h3>
          </div>
          <form onSubmit={handleSubmit} id="modalUser-form">
            <div className="label-input-modalUser">
              <label htmlFor="modalUser-nome">Nome</label>
              <input
                type="text"
                id="modalUser-nome"
                className="input-ModalUser"
                placeholder="Insira o nome do usuário"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </div>

            <div className="label-input-modalUser">
              <label htmlFor="modalUser-email">E-mail</label>
              <input
                type="email"
                id="modalUser-email"
                className="input-ModalUser"
                placeholder="Ex: email@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="label-input-modalUser">
              <label htmlFor="modalUser-senha">Senha</label>
              <input
                type="password"
                id="modalUser-senha"
                className="input-ModalUser"
                placeholder="Insira a senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>

            <div className="label-input-modalUser">
              <label htmlFor="modalUser-permissoes">Permissões</label>
              <select
                name="permissoes"
                id="modalUser-permissoes"
                className="input-ModalUser"
                value={permissao}
                onChange={(event) => setPermissao(event.target.value)}
              >
                {opcoes.map((itens) => (
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
                value={cargo}
                onChange={(event) => setCargo(event.target.value)}
              />
            </div>
            <DarkButton text="Salvar" />
          </form>
        </div>
        </div>
      </DialogContent>
    </Dialog> 
  )
}

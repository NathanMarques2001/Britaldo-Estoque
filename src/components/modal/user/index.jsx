//bibliotecas
import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import { RxCross1 } from 'react-icons/rx'
import { useState } from 'react'
//componentes
import { Loading } from '../../loading'
import { BotaoEscuro } from '../../button/botao-escuro'
import { MensagemErro } from '../../mensagem-erro'
//funções,variaveis e estilos
import './style.css'
import { validaEmail, validaSenha } from '../../../utils/regex.js'
import AuthService from '../../../services/auth/AuthService'
import { post } from '../../../services/firestore/user'

export function ModalAdicionaUsuario({ abrir, fechar }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    cargo: '',
    permissao: '',
    opcoes: [
      { value: '', label: '' },
      { value: 'Admin', label: 'Administrador' },
      { value: 'User', label: 'Usuário' },
    ],
  })
  const [erro, setErro] = useState({
    email: false,
    senha: false,
    cadastrado: false,
  })
  const [loading, setLoading] = useState(false)
  const borda = '1px solid red'

  const atualizaNome = (event) => {
    setForm({
      ...form,
      nome: event.target.value,
    })
  }

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

  const atualizaCargo = (event) => {
    setForm({
      ...form,
      cargo: event.target.value,
    })
  }

  const atualizaPermsissao = (event) => {
    setForm({
      ...form,
      permissao: event.target.value,
    })
  }

  const reiniciaFormulario = () => {
    setForm({
      nome: '',
      email: '',
      senha: '',
      cargo: '',
      permissao: '',
      opcao: '',
    })
  }

  const atualizaErroEmail = (novoValor) => {
    setErro({
      ...erro,
      email: novoValor,
    })
  }

  const atualizaErroSenha = (novoValor) => {
    setErro({
      ...erro,
      senha: novoValor,
    })
  }

  const atualizaErroCadastrado = (novoValor) => {
    setErro({
      ...erro,
      cadastrado: novoValor,
    })
  }

  const reiniciaErros = () => {
    setErro({
      email: false,
      senha: false,
      cadastrado: false,
    })
  }

  const enviaFormulario = (event) => {
    event.preventDefault()

    if (validaEmail(form.email) && validaSenha(form.senha)) {
      setLoading(true)

      new AuthService()
        .cadastrarNovoUsuario(form.email, form.senha)
        .then((response) => {
          const uid = response.user.uid
          //destructuring
          const { senha, opcoes, ...dados } = form
          //Envia dados para o banco
          post(dados, uid)
          console.log(response.user)
          reiniciaFormulario
          // Fecha o modal
          fechar()
          setLoading(false)
        })
        .catch((error) => {
          if (error.code == 'auth/email-already-in-use') {
            atualizaErroCadastrado(true)
          }
          setLoading(false)
        })
    } else {
      if (!validaEmail(form.email)) {
        atualizaErroEmail(true)
      }
      if (!validaSenha(form.senha)) {
        atualizaErroSenha(true)
      }
    }
    reiniciaErros
  }

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
                    onChange={atualizaNome}
                  />
                </div>

                <div className="label-input-modalUser">
                  <label htmlFor="modalUser-email">E-mail</label>
                  <input
                    type="email"
                    id="modalUser-email"
                    className="input-ModalUser"
                    placeholder="Ex: email@email.com"
                    required
                    value={form.email}
                    onChange={atualizaEmail}
                    style={{ border: erro.email ? borda : '' }}
                  />
                  {erro.email ? (
                    <MensagemErro texto="Verificar e-mail inserido" />
                  ) : (
                    <></>
                  )}
                  {erro.cadastrado ? (
                    <MensagemErro texto="Usuário já cadastrado!" />
                  ) : (
                    <></>
                  )}
                </div>

                <div className="label-input-modalUser">
                  <label htmlFor="modalUser-senha">Senha</label>
                  <input
                    type="password"
                    id="modalUser-senha"
                    className="input-ModalUser"
                    placeholder="Insira uma senha com no mínimo 6 dígitos"
                    required
                    value={form.senha}
                    onChange={atualizaSenha}
                    style={{ border: erro.senha ? borda : '' }}
                  />
                  {erro.senha ? (
                    <MensagemErro texto="Inserir uma senha com pelo menos 6 dígitos" />
                  ) : (
                    <></>
                  )}
                </div>

                <div className="label-input-modalUser">
                  <label htmlFor="modalUser-permissoes">Permissões</label>
                  <select
                    name="permissoes"
                    id="modalUser-permissoes"
                    className="input-ModalUser"
                    required
                    value={form.permissao}
                    onChange={atualizaPermsissao}
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
                    onChange={atualizaCargo}
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

import './style.css'
import imgCadastro from '../../assets/cadastro.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { validaEmail, validaSenha } from '../../utils/regex'
import AuthService from '../../services/auth/AuthService'
import { Loading } from '../../components/loading'
import { BotaoEscuro } from '../../components/button/botao-escuro'
import UsersCollection from '../../services/firestore/UsersCollection'
import { MensagemErro } from '../../components/mensagem-erro'

export function Cadastro() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    cargo: '',
    permissao: 'New User',
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

  const reiniciaFormulario = () => {
    setForm({
      nome: '',
      email: '',
      senha: '',
      cargo: '',
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

  const authService = new AuthService();
  const usersCollection = new UsersCollection()

  const enviaFormulario = (event) => {
    event.preventDefault()

    if (validaEmail(form.email) && validaSenha(form.senha)) {
      setLoading(true)

      authService.cadastrarNovoUsuario(form.email, form.senha)
        .then((response) => {
          const uid = response.user.uid
          //destructuring
          const { senha, opcoes, ...dados } = form

          usersCollection.post(uid, dados)

          reiniciaFormulario
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
      <div id="background-cadastro">
        <img src={imgCadastro} alt="imagem-cadastro" id='img-cadastro' />
        <form onSubmit={enviaFormulario} id="cadastro-form">
          <h3 id="cadastro-titulo">Insira seus dados</h3>
          <div className="label-input-cadastro">
            <label htmlFor="cadastro-nome">Nome</label>
            <input
              type="text"
              id="cadastro-nome"
              className="input-cadastro"
              placeholder="Insira o nome do usuário"
              required
              value={form.nome}
              onChange={atualizaNome}
            />
          </div>

          <div className="label-input-cadastro">
            <label htmlFor="cadastro-email">E-mail</label>
            <input
              type="email"
              id="cadastro-email"
              className="input-cadastro"
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

          <div className="label-input-cadastro">
            <label htmlFor="cadastro-senha">Senha</label>
            <input
              type="password"
              id="cadastro-senha"
              className="input-cadastro"
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

          <div className="label-input-cadastro">
            <label htmlFor="cadastro-cargo">Cargo</label>
            <input
              type="text"
              id="cadastro-cargo"
              className="input-cadastro"
              placeholder="Insira o cargo"
              required
              value={form.cargo}
              onChange={atualizaCargo}
            />
          </div>
          <div className="label-input-cadastro" id='container-botao-cadastro'>
            <BotaoEscuro texto="Salvar" />
            <button onClick={e => { e.preventDefault()
            navigate('/')}} id='botao-cancelar-cadastro'>Cancelar</button>
          </div>
        </form>
      </div>
    </>
  )
}
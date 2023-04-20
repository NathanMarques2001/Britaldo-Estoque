//bibliotecas
import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { RxCross1 } from 'react-icons/rx'
import { useState } from 'react'
//componentes
import { Loading } from '../../loading'
import { BotaoEscuro } from '../../button/botao-escuro'
import { MensagemErro } from '../../mensagem-erro'
//funções,variaveis e estilos
import './style.css'
import { app, db } from '../../../services/firebaseConfig.js'
import { validaEmail, validaSenha } from '../../../utils/regex.js'

export function ModalAdicionaUsuario({ abrir, fechar }) {
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
  const [loading, setLoading] = useState(false)
  const [borderStyle, setBorderStyle] = useState('')
  const [erroEmail, setErroEmail] = useState(false)
  const [erroSenha, setErroSenha] = useState(false)
  const [cadastrado, setCadastrado] = useState(false)

  const enviaFormulario = (event) => {
    event.preventDefault()

    if (validaEmail(email) && validaSenha(senha)) {
      setLoading(true)
      const auth = getAuth(app)
      createUserWithEmailAndPassword(auth, email, senha)
        .then((response) => {
          const uid = response.user.uid
          sendEmailVerification(response.user)
            .then((data) => {
              setDoc(doc(db, 'users', uid), {
                nome,
                email,
                permissao,
                cargo,
              })
            })
            .catch((err) => console.error(err))

          setNome('')
          setEmail('')
          setSenha('')
          setCargo('')
          setPermissao('')
          // Fecha o modal
          fechar()
          setLoading(false)
        })
        .catch((error) => {
          if (error.code == 'auth/email-already-in-use') {
            setCadastrado(true)
          }
          setLoading(false)
        })
    } else {
      setBorderStyle('1px solid red')
      if (!validaEmail(email)) {
        setErroEmail(true)
      }
      if (!validaSenha(senha)) {
        setErroSenha(true)
      }
    }
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
              <div id="container-titlo-modalUser">
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
                    style={{ border: `${borderStyle}` }}
                  />
                  {erroEmail ? (
                    <MensagemErro texto="Verificar e-mail inserido" />
                  ) : (
                    <></>
                  )}
                  {cadastrado ? (
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
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    style={{ border: `${borderStyle}` }}
                  />
                  {erroSenha ? (
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
                <BotaoEscuro texto="Salvar" />
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

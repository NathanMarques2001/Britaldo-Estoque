//bibliotecas
import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import { RxCross1 } from 'react-icons/rx'
import { useState } from 'react'
//componentes
import { Loading } from '../../loading'
import { BotaoEscuro } from '../../button/botao-escuro'
//funções,variaveis e estilos
import './style.css'
import ProdutosCollection from '../../../services/firestore/ProdutosCollection'

export function ModalAdicionarProduto({ abrir, fechar }) {
  const [form, setForm] = useState({
    nome: '',
    quantidade: 1,
    observacoes: '',
  })

  const produtosCollection = new ProdutosCollection()
  const [loading, setLoading] = useState(false)

  const atualizaNome = (event) => {
    setForm({
      ...form,
      nome: event.target.value,
    })
  }

  const atualizaQuantidade = (event) => {
    setForm({
      ...form,
      quantidade: event.target.value,
    })
  }

  const atualizaObservacoes = (event) => {
    setForm({
      ...form,
      observacoes: event.target.value,
    })
  }

  const enviaFormulario = async (event) => {
    event.preventDefault()
    try {
      setLoading(true);
      await produtosCollection.post(form);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    fechar();
  }

  return (
    <>
      {loading ? <Loading /> : <></>}
      <Dialog open={abrir}>
        <DialogContent>
          <div id="background-modalProdutos">
            <div id="container-modalProdutos">
              <div id="container-icone-modalProdutos">
                <span id="icone-modalProdutos" onClick={fechar}>
                  <RxCross1 />
                </span>
              </div>
              <div id="container-titulo-modalProdutos">
                <h3 id="modalProduto-titulo">Insira os dados do produto</h3>
              </div>
              <form onSubmit={enviaFormulario} id="modalProdutos-form">
                <div className="label-input-modalProdutos">
                  <label htmlFor="modalProdutos-nome">Nome</label>
                  <input
                    type="text"
                    id="modalProdutos-nome"
                    className="input-ModalProdutos"
                    placeholder="Insira o nome do produto"
                    required
                    value={form.nome}
                    onChange={atualizaNome}
                  />
                </div>

                <div className="label-input-modalProdutos">
                  <label htmlFor="modalProdutos-quantidade">Quantidade</label>
                  <input
                    type="number"
                    id="modalProdutos-quantidade"
                    className="input-ModalProdutos"
                    placeholder="1, 15, 100..."
                    required
                    value={form.quantidade}
                    onChange={atualizaQuantidade}
                  />
                </div>

                <div className="label-input-modalProdutos">
                  <label htmlFor="modalProdutos-observacoes">Obervações</label>
                  <textarea
                    id="modalProdutos-observacoes"
                    className="input-ModalProdutos"
                    placeholder="Insira as observações"
                    rows="5" cols="40"
                    value={form.observacoes}
                    onChange={atualizaObservacoes}
                  />
                </div>
                <div className="label-input-modalProdutos" id='container-botao-modalProdutos'>
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

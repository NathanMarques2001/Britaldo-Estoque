//bibliotecas
import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import { RxCross1 } from 'react-icons/rx'
import { useEffect, useState } from 'react'
//componentes
import { Loading } from '../../loading'
import { BotaoEscuro } from '../../button/botao-escuro'
//funções,variaveis e estilos
import './style.css'
import ProdutosCollection from '../../../services/firestore/ProdutosCollection'
import { validaQuantidade } from '../../../utils/validaDados'

export function ModalEditaProduto({ abrir, fechar, nome, quantidade, observacoes, id, modalBaixa }) {
  const [form, setForm] = useState({
    nome: nome,
    quantidade: quantidade,
    observacoes: observacoes,
  })

  const [baixa, setBaixa] = useState(0)

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

  const atualizaBaixa = (event) => {
    setBaixa(event.target.value)
  }

  const enviaFormulario = async (event) => {
    event.preventDefault()
    try {
      setLoading(true);
      if (validaQuantidade(form.quantidade)) {
        await produtosCollection.patch(id, form);
        fechar();
      } else {
        alert("Menor que 0")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setForm({
      ...form,
      quantidade: quantidade - baixa
    })
  }, [baixa])

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
                    disabled={modalBaixa ? true : false}
                    value={form.nome}
                    onChange={atualizaNome}
                  />
                </div>

                <div id='label-input-modalProdutos-quantidade' className="label-input-modalProdutos">
                  <div className='div-label-input-modalProdutos-quantidade'>
                    <label htmlFor="modalProdutos-quantidade">Quantidade</label>
                    <input
                      type="number"
                      id="modalProdutos-quantidade-editar-baixa"
                      className="input-ModalProdutos"
                      placeholder="1, 15, 100..."
                      required
                      disabled={modalBaixa ? true : false}
                      value={form.quantidade}
                      onChange={atualizaQuantidade}
                      style={{ padding: `${modalBaixa ? '5%' : '3%'}`, width: `${modalBaixa ? '35%' : '20%'}` }}
                    />
                  </div>

                  {modalBaixa &&
                    <div className='div-label-input-modalProdutos-quantidade'>
                      <label htmlFor="modalProdutos-baixa">Baixar</label>
                      <input
                        type="number"
                        id="modalProdutos-quantidade-editar-baixa"
                        className="input-ModalProdutos"
                        placeholder="1, 15, 100..."
                        required
                        value={baixa}
                        onChange={atualizaBaixa}
                        style={{ padding: `${modalBaixa ? '5%' : '3%'}`, width: `${modalBaixa ? '35%' : '20%'}` }}
                      />
                    </div>
                  }

                </div>

                <div className="label-input-modalProdutos">
                  <label htmlFor="modalProdutos-observacoes">Obervações</label>
                  <textarea
                    id="modalProdutos-observacoes"
                    className="input-ModalProdutos"
                    placeholder="Insira as observações"
                    disabled={modalBaixa ? true : false}
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

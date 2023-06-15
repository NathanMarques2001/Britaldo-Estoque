import './style.css'
import Baixa from '../../assets/baixa.svg'
import Editar from '../../assets/editar.svg'
import Excluir from '../../assets/excluir.svg'
import { useEffect, useState } from 'react'
import ProdutosCollection from '../../services/firestore/ProdutosCollection'
import { Loading } from '../loading'
import { ModalEditaProduto } from '../modal/editar-produto'
import { PopUp } from '../pop-up'

export function TabelaProdutos({ filtro, permissao }) {
  const [produtos, setProdutos] = useState([{
    nome: '',
    quantidade: 0,
    observacoes: '',
    id: ''
  }])

  const [produto, setProduto] = useState({})
  const [abrirProdutos, setAbrirProdutos] = useState(false)
  const [abrirBaixa, setAbrirBaixa] = useState(false)
  const [abrirPopUp, setAbrirPopUp] = useState(false)
  const [abrirPopUpAdmin, setAbrirPopUpAdmin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [itemAtual, setItemAtual] = useState({})

  const produtosCollection = new ProdutosCollection();

  function abreModal() {
    setLoading(true)
    setAbrirProdutos(true)
    setLoading(false)
  }

  function abreModalBaixa() {
    setAbrirBaixa(true)
  }

  function fechaModal() {
    setAbrirProdutos(false)
  }

  function abrePopUp(item) {
    setAbrirPopUp(true)
    setItemAtual(item)
  }

  function fechaPopUp() {
    setAbrirPopUp(false)
  }

  function abrePopUpAdmin() {
    setAbrirPopUpAdmin(true)
  }

  function fechaPopUpAdmin() {
    setAbrirPopUpAdmin(false)
  }

  function fechaModalBaixa() {
    setAbrirBaixa(false)
  }

  function excluirProduto() {
    try {
      produtosCollection.delete(itemAtual.id)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    produtosCollection.get((produtos) => {
      setProdutos(produtos.sort((a, b) => {
        if (a.nome < b.nome) {
          return -1;
        }
        if (a.nome > b.nome) {
          return 1;
        }
        return 0;
      }));
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && <Loading />}
      <PopUp
        abrir={abrirPopUp}
        fechar={fechaPopUp}
        mensagem="Você tem certeza de que deseja excluir este produto?
      Esta ação é irreversível."
        quantidadeBotoes={2}
        botao1="Confirmar"
        botao2="Cancelar"
        operacao={excluirProduto}
      />
      <PopUp
        abrir={abrirPopUpAdmin}
        fechar={fechaPopUpAdmin}
        mensagem="Você não tem permissão para executar está operação!"
        quantidadeBotoes={1}
        botao1="OK"
        operacao={fechaPopUpAdmin}
      />
      <div id="tabela-container">
        <table id="tabela-produtos">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.filter(filtrado => filtrado.nome.toLowerCase().includes(filtro)).map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.quantidade}</td>
                <td>{item.observacoes}</td>
                <td id="container-botao-tabela">
                  {
                    <button onClick={async () => {
                      try {
                        const product = await produtosCollection.getProduto(item.id);
                        setProduto(product);
                        abreModalBaixa();
                      } catch (error) {
                        console.log(error);
                      }
                    }} id="btn-baixa" className="botao-tabela">
                      <img src={Baixa} alt="" className="img-botao" id="img-baixa" />
                    </button>
                  }
                  {abrirBaixa &&
                    <ModalEditaProduto
                      abrir={abrirBaixa}
                      fechar={fechaModalBaixa}
                      nome={produto.nome}
                      quantidade={produto.quantidade}
                      observacoes={produto.observacoes}
                      id={produto.id}
                      modalBaixa={true}
                    />}
                  <button onClick={async () => {
                    if (permissao === 'Superadmin' || permissao === 'Admin') {
                      try {
                        const product = await produtosCollection.getProduto(item.id);
                        setProduto(product);
                        abreModal();
                      } catch (error) {
                        console.log(error);
                      }
                    } else {
                      abrePopUpAdmin()
                    }

                  }} id="btn-editar" className="botao-tabela">
                    <img src={Editar} alt="" className="img-botao" id="img-editar" />
                  </button>
                  {abrirProdutos &&
                    <ModalEditaProduto
                      abrir={abrirProdutos}
                      fechar={fechaModal}
                      nome={produto.nome}
                      quantidade={produto.quantidade}
                      observacoes={produto.observacoes}
                      id={produto.id}
                      modalBaixa={false}
                    />
                  }
                  <button onClick={async () => {
                    if (permissao === 'Superadmin' || permissao === 'Admin') {
                      abrePopUp(item)
                    } else {
                      abrePopUpAdmin()
                    }
                  }} id="btn-excluir" className="botao-tabela">
                    <img src={Excluir} alt="" className="img-botao" id="img-excluir" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

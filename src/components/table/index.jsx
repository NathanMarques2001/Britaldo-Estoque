import './style.css'
import Baixa from '../../assets/baixa.svg'
import Editar from '../../assets/editar.svg'
import Excluir from '../../assets/excluir.svg'

export function Table({ titulo2, titulo3, quantidadeBotoes }) {
  return (
    <table id="tabela-produtos">
      <tr>
        <th>Nome</th>
        <th>{titulo2}</th>
        <th>{titulo3}</th>
        <th>Ações</th>
      </tr>
      <tr>
        <td>Papel A4 com 500 unidades</td>
        <td>5</td>
        <td>Papel branco</td>
        <td>
          {quantidadeBotoes > 2 ? (
            <button>
              <img src={Baixa} alt="" />
            </button>
          ) : (
            <></>
          )}
          <button>
            <img src={Editar} alt="" />
          </button>
          <button>
            <img src={Excluir} alt="" />
          </button>
        </td>
      </tr>
    </table>
  )
}

import './style.css'
import Editar from '../../assets/editar.svg'
import Excluir from '../../assets/excluir.svg'

export function Table2({ titulo2, titulo3, quantidadeBotoes }) {
    return (
        <table id="tabela-usuarios">
            <tr>
                <th>Nome</th>
                <th>{titulo2}</th>
                <th>{titulo3}</th>
                <th>Ações</th>
            </tr>
            <tr>
                <td>
                    Usuário
                </td>
                <td>Usuário@gmail.com</td>
                <td>Administrador</td>
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
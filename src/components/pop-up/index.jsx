import './style.css'
import { Dialog, DialogContent } from '@radix-ui/react-dialog'

export function PopUp({ abrir, fechar, mensagem, quantidadeBotoes, botao1, botao2, operacao }) {

  const confirmaOperacao = async () => {
    await operacao();
    fechar();
  }

  return (<>
    <Dialog open={abrir}>
      <DialogContent>
        <div id='background-popup-geral'>
          <div id='container-popup-geral'>
            <div id='container-texto-popup-geral'><p id='texto-popup-geral'>{mensagem}</p></div>
            <div id='container-botoes'>
              {quantidadeBotoes > 1 ? <button className='botao-popup-geral' onClick={fechar}>{botao2}</button> : <></>}
              <button className='botao-popup-geral' onClick={confirmaOperacao}>{botao1}</button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog >
  </>)
}
import ',/style.css'

export function PopUp({ abrir, fechar, mensagem, quantidadeBotoes, botao1, botao2, operacao }) {

  const confirmaOperacao = async () => {
    await operacao();
    fechar();
  }

  return (<>
    <Dialog open={abrir}>
      <DialogContent>
        <div><p>{mensagem}</p></div>
        {quantidadeBotoes > 1 ? <button onClick={fechar}>{botao2}</button> : <></>}
        <button onClick={confirmaOperacao}>{botao1}</button>
      </DialogContent>
    </Dialog>
  </>)
}
import './style.css'

export function BotaoClaro({ texto, abreModal }) {
  return (
    <button id="light-button" onClick={abreModal}>
      <p id='light-button-texto'>{texto}</p>
    </button>
  )
}

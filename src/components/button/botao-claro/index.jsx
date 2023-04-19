import './style.css'

export function BotaoClaro({ texto, abreModal }) {
  return (
    <button id="light-button" onClick={abreModal}>
      <h2>{texto}</h2>
    </button>
  )
}

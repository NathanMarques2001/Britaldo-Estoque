import './style.css'

export function BotaoEscuro({ texto }) {
  return (
    <button id="dark-button">
      <p id='dark-button-texto'>{texto}</p>
    </button>
  )
}

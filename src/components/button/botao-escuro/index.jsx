import './style.css'

export function BotaoEscuro({ texto }) {
  return (
    <button id="dark-button" className='btn-login'>
      <p id='dark-button-texto'>{texto}</p>
    </button>
  )
}

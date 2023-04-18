import './style.css'

export function LightButton({ text, func }) {
  return (
    <button id="light-button" onClick={func}>
      <h2>{text}</h2>
    </button>
  )
}

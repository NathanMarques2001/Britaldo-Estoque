import './style.css'
import cloud from '../../assets/cloud.svg'

export function Loading() {
  return (
    <div id='cloud'>
      <img src={cloud} alt="" id='cloud-image' className="loading-image" />
      <span id="loader" className="loading-image"></span>
    </div>
  )
}

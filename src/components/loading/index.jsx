import './style.css'
import ReactLoading from 'react-loading'

export function Loading() {
  return (
    <div id='container-loading'>
      <ReactLoading type={'spokes'} color={'#FFF'} height={'15%'} width={'15%'}/>
    </div>
  )
}

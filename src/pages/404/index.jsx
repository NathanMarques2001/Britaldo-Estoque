import './style.css'
import notFound from '../../assets/404.svg'

export function NotFound() {
    return (
        <div id='container-notFound'>
            <img src={notFound} alt="Erro 404" id='imgNotFound' />
        </div>
    )
}
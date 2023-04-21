import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
//rotas
import { Home } from '../pages/home'
import { Login } from '../pages/login'
import { Usuarios } from '../pages/usuarios'
import { RecuperarSenha } from '../pages/recuperar-senha'
//
import { Loading } from '../components/loading'
import { useAuthContext } from '../contexts/auth/authContext'

export function AppRoutes() {
  const { carregandoUsuarioLogado, user } = useAuthContext()

  return (
    <>
      {!carregandoUsuarioLogado && (
        <Router>
          <Routes>
            <Route
              path="/"
              element={!user ? <Login /> : <Navigate to={'/home'} />}
            />
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to={'/'} />}
            />
            <Route
              path="/usuarios"
              element={user ? <Usuarios /> : <Navigate to={'/'} />}
            />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          </Routes>
        </Router>
      )}
      {carregandoUsuarioLogado ? <Loading /> : <></>}
    </>
  )
}

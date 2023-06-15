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
import { Cadastro } from '../pages/cadastro'
import { NotFound } from '../pages/404'
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
              path="/login"
              element={!user ? <Login /> : <Navigate to={'/'} />}
            />
            <Route
              path="/cadastro"
              element={!user ? <Cadastro /> : <Navigate to={'/'} />}
            />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to={'/login'} />}
            />
            <Route
              path="/usuarios"
              element={user ? <Usuarios /> : <Navigate to={'/login'} />}
            />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      )}
      {carregandoUsuarioLogado ? <Loading /> : <></>}
    </>
  )
}

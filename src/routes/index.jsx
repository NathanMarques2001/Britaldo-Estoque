import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from '../pages/home'
import { Login } from '../pages/login'
import { Usuarios } from '../pages/usuarios'
import { RecuperarSenha } from '../pages/recuperar-senha'

export function AppRoutes() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        </Routes>
      </Router>
  )
}
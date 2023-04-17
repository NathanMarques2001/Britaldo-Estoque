import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from '../pages/home'
import { Login } from '../pages/login'
import { Users } from '../pages/users'
import { RecoverPassword } from '../pages/recover-password'

export function AppRoutes() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/recover" element={<RecoverPassword />} />
        </Routes>
      </Router>
  )
}
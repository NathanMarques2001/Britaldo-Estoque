import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/home'
import { Login } from '../pages/login'
import { Users } from '../pages/users'
import { AddProductModal } from '../components/modal/product'
import { AddUserModal } from '../components/modal/user'

export function AppRoutes() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/modal-produto" element={<AddProductModal />} />
          <Route path="/modal-user" element={<AddUserModal />} />
        </Routes>
      </Router>
  )
}
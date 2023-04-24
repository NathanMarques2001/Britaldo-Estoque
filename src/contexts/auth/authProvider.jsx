import { useEffect, useState } from 'react'
import { AuthContext } from './authContext'
import * as firebaseAuth from 'firebase/auth'
import { auth } from '../../services/firebaseConfig'

export default function AuthProvider(props) {
  const [carregandoUsuarioLogado, setCarregandoUsuarioLogado] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (user) => {
      setCarregandoUsuarioLogado(false)
      setUser(user)
      //Fazer a query e passar estado aqui
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        carregandoUsuarioLogado,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

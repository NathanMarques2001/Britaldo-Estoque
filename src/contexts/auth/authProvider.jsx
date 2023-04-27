import { useEffect, useState } from 'react'
import { AuthContext } from './authContext'
import * as firebaseAuth from 'firebase/auth'
import { auth } from '../../services/firebaseConfig'

export default function AuthProvider(props) {
  const [carregandoUsuarioLogado, setCarregandoUsuarioLogado] = useState(true)
  const [user, setUser] = useState(null)
  //Criar estado aqui

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (user) => {
      setCarregandoUsuarioLogado(false)
      setUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        carregandoUsuarioLogado,
        user
        //passar estado aqui tambem
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

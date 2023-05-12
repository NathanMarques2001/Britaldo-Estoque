import { useEffect, useState } from 'react'
import { AuthContext } from './authContext'
import * as firebaseAuth from 'firebase/auth'
import { auth } from '../../services/firebaseConfig'
import UsersCollection from '../../services/firestore/UsersCollection';

export default function AuthProvider(props) {
  const [carregandoUsuarioLogado, setCarregandoUsuarioLogado] = useState(true);
  const [user, setUser] = useState(null);
  const [permissao, setPermissao] = useState("");
  const usersCollection = new UsersCollection();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (user) => {
      setCarregandoUsuarioLogado(false);
      setUser(user);
      if (user != null) {
        usersCollection.validaPermissao(user.uid).then((response) => setPermissao(response)).catch((error) => error)
      } else {
        setPermissao("");
      }
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        carregandoUsuarioLogado,
        user,
        permissao
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

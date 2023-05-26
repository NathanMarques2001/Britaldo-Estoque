import { useEffect, useState } from 'react'
import { AuthContext } from './authContext'
import * as firebaseAuth from 'firebase/auth'
import { auth } from '../../services/firebaseConfig'
import UsersCollection from '../../services/firestore/UsersCollection';
import AuthService from '../../services/auth/AuthService';

export default function AuthProvider(props) {
  const [carregandoUsuarioLogado, setCarregandoUsuarioLogado] = useState(true);
  const [user, setUser] = useState(null);
  const [permissao, setPermissao] = useState("");
  const usersCollection = new UsersCollection();
  const authService = new AuthService();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (user != null) {
        usersCollection.validaPermissao(user.uid).then((response) => {
          if (response == null) {
            authService.deletarUsuario(user).then((data) => {
              console.log(data);
            });
          } else {
            setPermissao(response);
            setUser(user);
            setCarregandoUsuarioLogado(false);
          }
        }).catch(() => {
          setCarregandoUsuarioLogado(false);
        });
      } else {
        setPermissao("");
        setCarregandoUsuarioLogado(false);
      }
    });
  }, []);


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

import * as firebaseAuth from 'firebase/auth'
import { auth } from '../firebaseConfig'


export default class AuthService {
  logar(email, senha) {
    return firebaseAuth
      .signInWithEmailAndPassword(auth, email, senha)
      .then((user) => {
        return user
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  recuperarSenha(email) {
    return firebaseAuth.sendPasswordResetEmail(auth, email)
  }

  sair() {
    return firebaseAuth.signOut(auth)
  }

  cadastrarNovoUsuario(email, senha) {
    return firebaseAuth
      .createUserWithEmailAndPassword(auth, email, senha)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  deletarUsuario(user) {
    firebaseAuth.deleteUser(user)
      .then((response) => response)
      .catch(function (error) {
        console.log("Error deleting user", user, error);
      })
  };
}

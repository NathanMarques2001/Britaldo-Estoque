import * as firebaseAuth from 'firebase/auth'
import { app, auth } from '../firebaseConfig'

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

  deletarUsuario(id) {
    return firebaseAuth.deleteUser(user)
      .then((response) =>
        console.log("usuario deletado!"))
      .catch((error) => {
        console.log("ERRO!\n" + error)
      })
  }
}

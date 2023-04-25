import * as firebaseAuth from 'firebase/auth'
import { auth } from '../firebaseConfig'

export default class AuthService {
  logar(email, senha) {
    return firebaseAuth
      .signInWithEmailAndPassword(auth, email, senha)
      .then((user) => {
        console.log(user)
        return user
      })
      .catch((error) => {
        console.log('error', error)
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
        console.log(response)
        return response
      })
      .catch((error) => {
        console.log('error', error)
        return Promise.reject(error)
      })
  }
}

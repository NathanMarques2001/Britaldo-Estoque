import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { app } from './firebaseConfig.js'

export const auth = getAuth(app);

function createUser(email, password) {
  const auth = getAuth(app)
  createUserWithEmailAndPassword(auth, email, password)
    .then((response) => console.log('usuario criado com sucesso!'))
    .catch((error) => {
      if (error.code == 'auth/email-already-in-use') {
        console.error('Usuario ja cadastrado!')
      }
    })
}

export function isLogged() {
  const auth = getAuth(app)
  onAuthStateChanged(auth, function (user) {
    if (user) {
      console.log('esta logado')
    }
  })
}

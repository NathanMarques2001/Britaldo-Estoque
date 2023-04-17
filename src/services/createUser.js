import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from './firebaseConfig.js'

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
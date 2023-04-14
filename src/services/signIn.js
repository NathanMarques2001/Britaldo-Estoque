import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from './firebaseConfig.js'

export function signIn(email, password) {
  const auth = getAuth(app)
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      //logged
      console.log("logado")
      console.log(isLogged());
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log("nao cadastrado!")
    })
}
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from './firebaseConfig'

export function signIn(email, password) {
  const auth = getAuth(app)
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      //logged
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
}

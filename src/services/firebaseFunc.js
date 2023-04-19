import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'
import { app } from './firebaseConfig.js'

export function isLogged() {
  const auth = getAuth(app)
  onAuthStateChanged(auth, function (user) {
    if (user) {
      console.log('esta logado')
    }
  })
}

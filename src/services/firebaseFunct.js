import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebaseConfig'

export function naoEstaLogado(user, rota) {
  onAuthStateChanged(auth, function (user) {
    if (!user) {
      rota
    }
  })
}

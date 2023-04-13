import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { app } from './firebaseConfig.js'

function recoverPassword(email) {
  const auth = getAuth(app)
  sendPasswordResetEmail(auth, email)
    .then((response) => {
      console.log('Email enviado com sucesso')
    })
    .catch((error) => {
      if (error.code == 'auth/user-not-found') {
        console.error('Usuário não encontrado')
      }
    })
}

recoverPassword("nathanbrandao1@gmail.com")
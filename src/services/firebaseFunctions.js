import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { app } from './firebaseConfig.js'

//Função que faz login
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

  //Função que reseta a senha
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

  //Função que cria o usuário
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

  //Função que verifica se o usuário está logado
  export function isLogged(){
    const auth = getAuth(app)
    onAuthStateChanged(auth, function(user) {
      if(user){
        console.log("esta logado")
      }
    })
  }

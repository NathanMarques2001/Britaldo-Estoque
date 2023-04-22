import { initializeApp } from 'firebase/app'
import { browserLocalPersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

//Configurações basicas da aplicação
const firebaseConfig = {
  apiKey: "AIzaSyBg_APDa-Mx_OUOgeooR4ADbKN6mFplw4Q",
  authDomain: "britaldo-estoque.firebaseapp.com",
  projectId: "britaldo-estoque",
  storageBucket: "britaldo-estoque.appspot.com",
  messagingSenderId: "260435782937",
  appId: "1:260435782937:web:9a0413ebbcd4e31476e988",
  measurementId: "G-6C9K0QNTMQ",
}

//Inicializa o firebase
export const app = initializeApp(firebaseConfig)
//Cria a autenticação do admin da aplicação
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence
})
//Inicializa o firestore
export const db = getFirestore(app);
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBg_APDa-Mx_OUOgeooR4ADbKN6mFplw4Q",
  authDomain: "britaldo-estoque.firebaseapp.com",
  projectId: "britaldo-estoque",
  storageBucket: "britaldo-estoque.appspot.com",
  messagingSenderId: "260435782937",
  appId: "1:260435782937:web:9a0413ebbcd4e31476e988",
  measurementId: "G-6C9K0QNTMQ",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

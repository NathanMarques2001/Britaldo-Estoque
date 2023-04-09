// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBg_APDa-Mx_OUOgeooR4ADbKN6mFplw4Q',
  authDomain: 'britaldo-estoque.firebaseapp.com',
  projectId: 'britaldo-estoque',
  storageBucket: 'britaldo-estoque.appspot.com',
  messagingSenderId: '260435782937',
  appId: '1:260435782937:web:9a0413ebbcd4e31476e988',
  measurementId: 'G-6C9K0QNTMQ',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

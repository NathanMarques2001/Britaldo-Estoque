import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";


export function post(dados, uid) {
    setDoc(doc(db, 'users', uid), dados)
}
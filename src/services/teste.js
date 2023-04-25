import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

signInWithEmailAndPassword(auth, "teste@teste.com", "123456")
.then((response) => {
  const uid = response.user.uid;

  async function banco(){
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef)
    let usuario;
  
    if (docSnap.exists()) {
      usuario = docSnap.data();
    } 
    if(usuario?.permissao == 'Superadmin' || usuario?.permissao == 'Admin'){
      console.log("É os guri!")
    } else {
      console.log("falhou")
    }
  }
  banco()
})
.catch((error) => {
  console.log(error)
  return;
})

import { db } from "../firebaseConfig.js";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export default class UsersCollection {

  get() {
    let arr = []
    const querySnapshot = getDocs(collection(db, "users")).then((response) => arr.push(response)).catch((error) => console.error(error))
    arr.forEach((doc) => console.log(doc.data()))
  }

  validaPermissao(uid) {
    const documento = doc(db, "users", uid);
    return getDoc(documento)
      .then((docSnap) => {
        let usuario;
        if (docSnap.exists()) {
          usuario = docSnap.data();
        }
        if (usuario?.permissao == 'Superadmin' || usuario?.permissao == 'Admin' || usuario?.permissao == 'User') {
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.error("Erro ao buscar documento:", error);
        return Promise.reject(error);
      });
  }
}

new UsersCollection().get();

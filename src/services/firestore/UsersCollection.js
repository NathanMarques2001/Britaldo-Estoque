import { db } from "../firebaseConfig.js";
import { collection, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

export default class UsersCollection {

  get(setEstado) {
    onSnapshot(collection(db, "users"), (snapshot) => setEstado(snapshot.docs.map((documento) => documento.data())))
  }

  post(uid, dados) {
    setDoc(doc(db, 'users', uid), dados)
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

import { db } from "../firebaseConfig.js";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

export default class ProdutosCollection {

  get(setEstado) {
    onSnapshot(collection(db, "produtos"), (snapshot) => setEstado(snapshot.docs.map((documento) => documento.data())))
  }

  async post(dados) {
    await addDoc(collection(db, "produtos"), dados)
  }
}
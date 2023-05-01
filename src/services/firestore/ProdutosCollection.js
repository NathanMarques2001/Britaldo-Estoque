import { db } from "../firebaseConfig.js";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

export default class ProdutosCollection {

  //Função que busca todos os documentos
  async get(setEstado) {
    await onSnapshot(collection(db, "produtos"), (snapshot) => {
      const produtos = snapshot.docs.map((documento) => {
        const data = documento.data();
        data.id = documento.id;
        return data;
      });
      setEstado(produtos);
    });
  }

  //Função que busca um documento específico
  async getProduto(id) {
    const docSnap = await getDoc(doc(db, "produtos", id));
    const data = docSnap.data()
    data.id = docSnap.id;
    return data;
  }

  //Função que cria um documento
  async post(dados) {
    await addDoc(collection(db, "produtos"), dados)
  }

  //Função que atualiza alguns dados
  async patch(id, dados) {
    await setDoc(doc(db, 'produtos', id), dados)
  }

  //Função que atualiza apenas um dado
  async put() {
    //Lógica aqui
  }

  //Função que deleta um documento
  async delete() {
    //Lógica aqui
  }
}
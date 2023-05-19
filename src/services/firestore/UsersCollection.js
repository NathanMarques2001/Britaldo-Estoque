import { db } from "../firebaseConfig.js";
import { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

export default class UsersCollection {

  //Função que busca todos os documentos
  async get(setEstado) {
    await onSnapshot(collection(db, "users"), (snapshot) => {
      const users = snapshot.docs.map((documento) => {
        const data = documento.data();
        data.id = documento.id;
        return data;
      });
      setEstado(users);
    });
  }

  //Função que busca um documento específico
  async getUser(id) {
    const docSnap = await getDoc(doc(db, "users", id));
    const data = docSnap.data()
    data.id = docSnap.id;
    return data;
  }

  //Função que cria um documento
  async post(uid, dados) {
    await setDoc(doc(db, 'users', uid), dados)
  }

  //Função que atualiza alguns dados
  async patch(id, dados) {
    await setDoc(doc(db, 'users', id), dados)
  }

  //Função que deleta um documento
  async delete(id) {
    await deleteDoc(doc(db, "users", id));
  }

  //Função que valida a permissão do usuário
  async validaPermissao(uid) {
    const documento = doc(db, "users", uid);
    const docSnap = await getDoc(documento);
    let usuario;
    if (docSnap.exists()) {
      usuario = docSnap.data();
    }
    return usuario.permissao;
  }
}

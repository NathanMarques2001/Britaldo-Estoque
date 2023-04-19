
//Inicializa o firebase
export const app = initializeApp(firebaseConfig)
//Cria a autenticação do admin da aplicação
export const auth = getAuth(app)
//Inicializa o firestore
export const db = getFirestore(app);
// 🔥 Tu configuración personalizada de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  databaseURL: "https://TU_DOMINIO.firebaseio.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_DOMINIO.appspot.com",
  messagingSenderId: "XXX",
  appId: "APP_ID",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

export { auth, db };

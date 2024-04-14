// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxhm8Zx9PfI-2NjxoMbvncKWL0bU6lJck",
  authDomain: "backup-security.firebaseapp.com",
  projectId: "backup-security",
  storageBucket: "backup-security.appspot.com",
  messagingSenderId: "366145866557",
  appId: "1:366145866557:web:72ee941d66f446a7bcd354"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const Auth = getAuth(app);
// const Firestore = getFirestore(app);

export default app;
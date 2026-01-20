import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingoj4u-317f5.firebaseapp.com",
  projectId: "vingoj4u-317f5",
  storageBucket: "vingoj4u-317f5.appspot.com",
  messagingSenderId: "999840359698",
  appId: "1:999840359698:web:b887e549e12ff3d9c8ffcb",
};

const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
export {app,auth}
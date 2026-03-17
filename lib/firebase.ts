import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmCHkEIVbPti637dwqQt11EaRu88nu2Xg",
  authDomain: "mrmbatha-dc317.firebaseapp.com",
  projectId: "mrmbatha-dc317",
  storageBucket: "mrmbatha-dc317.firebasestorage.app",
  messagingSenderId: "759816499170",
  appId: "1:759816499170:web:1f6dc2979e3525441753bb",
  measurementId: "G-VQFPC6M9BQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
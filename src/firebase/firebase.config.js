import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDWI_VO1ydTYF5elIkUFyEOYKb_sMz63iY",
    authDomain: "inception-7186e.firebaseapp.com",
    projectId: "inception-7186e",
    storageBucket: "inception-7186e.firebasestorage.app",
    messagingSenderId: "362626473782",
    appId: "1:362626473782:web:60dbb22fadc005b0a71d97"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
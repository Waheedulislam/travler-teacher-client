// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHjh58qPn1eHFVEDNAmiCTAVN6plPDQvw",
    authDomain: "tour-travler.firebaseapp.com",
    projectId: "tour-travler",
    storageBucket: "tour-travler.firebasestorage.app",
    messagingSenderId: "807909057940",
    appId: "1:807909057940:web:97bd3a0b8be6a0562a1b81"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
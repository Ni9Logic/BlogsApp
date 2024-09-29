import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAfc7lKmCz_NbJ_jOxFUXE8UnuNeoX7uKc",
    authDomain: "blogs-app-31a86.firebaseapp.com",
    projectId: "blogs-app-31a86",
    storageBucket: "blogs-app-31a86.appspot.com",
    messagingSenderId: "896125563672",
    appId: "1:896125563672:web:a84bfe71232d17e17ba46d",
    measurementId: "G-YT25N2NL3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
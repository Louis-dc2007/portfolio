import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD5D0ScIwI-uE2rb5kW6E8Vyf1UhlgOlco",
    authDomain: "portfolio-3ee26.firebaseapp.com",
    projectId: "portfolio-3ee26",
    storageBucket: "portfolio-3ee26.firebasestorage.app",
    messagingSenderId: "654908808933",
    appId: "1:654908808933:web:2e7e0f5d47c7aa9bb9be0c",
    measurementId: "G-DPZC88V0F9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const portfolioId = "portfolio-louis";

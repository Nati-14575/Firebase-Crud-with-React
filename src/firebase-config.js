import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCLO2YgZt9fn0Pv64nofI3UrC1SYSQy4Uo",
    authDomain: "fir-tutorial-56da3.firebaseapp.com",
    projectId: "fir-tutorial-56da3",
    storageBucket: "fir-tutorial-56da3.appspot.com",
    messagingSenderId: "913092076139",
    appId: "1:913092076139:web:ced193b8c27d4b3612872e",
    measurementId: "G-D5Q47KPGTJ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

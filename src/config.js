import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCxw9uhlJxyPWI74YDbX96XWb34iHVl_oM",
    authDomain: "interviewschedule-2f90e.firebaseapp.com",
    projectId: "interviewschedule-2f90e",
    storageBucket: "interviewschedule-2f90e.appspot.com",
    messagingSenderId: "200400123210",
    appId: "1:200400123210:web:5b6c6db935784a93813db3"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);
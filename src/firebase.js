import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxw9uhlJxyPWI74YDbX96XWb34iHVl_oM",
  authDomain: "interviewschedule-2f90e.firebaseapp.com",
  projectId: "interviewschedule-2f90e",
  storageBucket: "interviewschedule-2f90e.appspot.com",
  messagingSenderId: "200400123210",
  appId: "1:200400123210:web:5b6c6db935784a93813db3"
};
const app = firebase.initializeApp(firebaseConfig);
export default firebase;
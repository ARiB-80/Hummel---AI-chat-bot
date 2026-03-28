import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDRegHkWr-p8WBenOTPo-nWR8WHDrGKaIk",
  authDomain: "hummel-f2425.firebaseapp.com",
  projectId: "hummel-f2425",
  storageBucket: "hummel-f2425.firebasestorage.app",
  messagingSenderId: "174045402817",
  appId: "1:174045402817:web:512a8987492e23a607a640",
  measurementId: "G-X1BNN2DBGV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
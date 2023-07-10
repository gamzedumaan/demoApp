// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore,collection} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCJBfCaJEySmhAQp9dxg_OzuYY7DLwPcdA',
  authDomain: 'expensify-a3ca2.firebaseapp.com',
  projectId: 'expensify-a3ca2',
  storageBucket: 'expensify-a3ca2.appspot.com',
  messagingSenderId: '1058632628713',
  appId: '1:1058632628713:web:f9068bddc27428c5c9b378',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth(app);

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');
export default app;

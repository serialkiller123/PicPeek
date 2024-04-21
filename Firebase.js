// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {initializeFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCWIlcZ-8l7utAwmFNKeTxKV6SXB5LihhA',
  authDomain: 'picpeek-901d2.firebaseapp.com',
  projectId: 'picpeek-901d2',
  storageBucket: 'picpeek-901d2.appspot.com',
  messagingSenderId: '825397215158',
  appId: '1:825397215158:web:bda3f9801a40a7ed110b17',
  measurementId: 'G-C17NGSQ07K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {db};

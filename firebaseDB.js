// database/firebaseDb.js

import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBrSgGYmSzS_AQVLKPKt_SC9nQwFCkOqNk",
    authDomain: "rn-exam.firebaseapp.com",
    projectId: "rn-exam",
    storageBucket: "rn-exam.appspot.com",
    messagingSenderId: "67158740060",
    appId: "1:67158740060:web:f4ab6c59517f80fd87aa99"
  };

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
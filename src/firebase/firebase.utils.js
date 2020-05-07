 import firebase from 'firebase/app';

 import 'firebase/firestore';
 import 'firebase/auth';

 const config = {
     apiKey: "AIzaSyBHpMAHqK9zdHJGUre7_s8A3HtF-VSEIlE",
     authDomain: "crwn-db-910a9.firebaseapp.com",
     databaseURL: "https://crwn-db-910a9.firebaseio.com",
     projectId: "crwn-db-910a9",
     storageBucket: "crwn-db-910a9.appspot.com",
     messagingSenderId: "383980779901",
     appId: "1:383980779901:web:a1cde94b68d2d560967414",
     measurementId: "G-L3S3WVSZZT"
 };

 firebase.initializeApp(config);


 export const auth = firebase.auth();
 export const firestore = firebase.firestore();
 const provider = new firebase.auth.GoogleAuthProvider();

 provider.setCustomParameters({ prompts: 'select_acount' });

 export const signInWithGoogle = () => auth.signInWithPopup(provider);
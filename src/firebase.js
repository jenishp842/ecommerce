import firebase from 'firebase';

let firebaseConfig = {
    apiKey: "AIzaSyCdhBt1kWvsdgkS-_KgavNXyP1azzJXsrM",
    authDomain: "doctrace-notification.firebaseapp.com",
    projectId: "doctrace-notification",
    storageBucket: "doctrace-notification.appspot.com",
    messagingSenderId: "352179532447",
    appId: "1:352179532447:web:c79997741b1c22dfc568aa",
    measurementId: "G-6L0GENREG3"
    };
firebase.initializeApp(firebaseConfig);

export default firebase;
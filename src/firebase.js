import firebase from 'firebase'


const config = {
    apiKey: "AIzaSyAn96G-i0x8otNiC-78jfo3QBbaO8_4Woc",
    authDomain: "todo-bygprog.firebaseapp.com",
    projectId: "todo-bygprog",
    storageBucket: "todo-bygprog.appspot.com",
    messagingSenderId: "223138960395",
    appId: "1:223138960395:web:40c55ac29e0e5b4c9d630e"
  };

  firebase.initializeApp(config)

  var db = firebase.firestore();
  var auth = firebase.auth()
  export default db;
  export {auth};
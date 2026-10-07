importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);


firebase.initializeApp({

  apiKey:"AIzaSyBUhOxlOwQtVKl_8GRknnAc7FpiLyWq1gk",

  authDomain:"snapshop-47259.firebaseapp.com",

  projectId:"snapshop-47259",

  storageBucket:"snapshop-47259.firebasestorage.app",

  messagingSenderId:"974558981883",

  appId:"1:974558981883:web:918af6d114d62860454a5e"

});


const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload)=>{

 console.log(
  "Background message:",
  payload
 );

});
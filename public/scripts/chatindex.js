console.log("Hello")

// const firebase = require("firebase/app").default
import { initializeApp } from "firebase/app";


// import firebase from "firebase";
// import "firebase/messaging";



// Your web app's Firebase configuration
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyAR2hhz3wAoDx9jJnJZOEqFDQuNB90jR5M",
  authDomain: "monster-fighter-e09cb.firebaseapp.com",
  databaseURL: "https://monster-fighter-e09cb-default-rtdb.firebaseio.com",
  projectId: "monster-fighter-e09cb",
  storageBucket: "monster-fighter-e09cb.appspot.com",
  messagingSenderId: "438849954651",
  appId: "1:438849954651:web:1f31c68315f902b109b07e"
});


// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = firebase.messaging();

export const db = firebase.database();












// const username = prompt("Please Tell Us Your Name");
// console.log("Hello")

// function sendMessage(e) {
//   e.preventDefault();
//   console.log('Firebase')
//   // get values to be submitted
//   const timestamp = Date.now();
//   const messageInput = document.getElementById("message-input");
//   const message = messageInput.value;

//   // clear the input box
//   messageInput.value = "";

//   //auto scroll to bottom
//   document
//     .getElementById("messages")
//     .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

//   // create db collection and send in the data
//   db.ref("messages/" + timestamp).set({
//     username,
//     message,
//   });
// }

// const fetchChat = db.ref("messages/");
// console.log("Hello")
// fetchChat.on("child_added", function (snapshot) {
//   const messages = snapshot.val();
//   const message = `<li class=${
//     username === messages.username ? "sent" : "receive"
//   }><span>${messages.username}: </span>${messages.message}</li>`;
//   // append the message on the page
//   document.getElementById("messages").innerHTML += message;
// });

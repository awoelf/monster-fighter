// const { create } = require("handlebars");

console.log(firebase)

// App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR2hhz3wAoDx9jJnJZOEqFDQuNB90jR5M",
  authDomain: "monster-fighter-e09cb.firebaseapp.com",
  databaseURL: "https://monster-fighter-e09cb-default-rtdb.firebaseio.com",
  projectId: "monster-fighter-e09cb",
  storageBucket: "monster-fighter-e09cb.appspot.com",
  messagingSenderId: "438849954651",
  appId: "1:438849954651:web:1f31c68315f902b109b07e"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const whenSignedIn = document.querySelector('#whenSignedIn');
const whenSignedOut = document.querySelector('#whenSignedOut');

const signInBtn = document.querySelector('#signInBtn');
const signOutBtn = document.querySelector('#signOutBtn');

const userInfo = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user =>{
  if(user) {
    //signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userInfo.innerHTML = `<h2>Player: ${user.displayName}!</h2> <p>User Id: ${user.uid}</p>`;
    console.log(user.displayName)
    console.log(user.uid)
  } else {
    //not signed in
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userInfo.innerHTML = '';
  }
});

const db = firebase.firestore();

// const thingsList = document.querySelector('#thingsList');
// const createThing = document.querySelector('#createThing');

// let thingsRef;
// let unsubscribe;

// auth.onAuthStateChanged(user =>{
//   if(user) {

//     thingsRef = db.collection('item')

//     createThing.onclick = () => {
//       thingsRef.add ({
//         uid: user.uid,
//         name: user.displayName,
//         chat: "meow",
//       });
//     }

//     unsubscribe = thingsRef
//       .where('uid', '==', user.uid)
//       .onSnapshot(querySnapshot => {
//         const items = querySnapshot.docs.map(doc => {
//           return `<li>${doc.data().chat}</li>`
//         });

//         thingsList.innerHTML = items.join('');
//       })

//   } else {
//       unsubscribe && unsubscribe();
//   }
// });
///////////////////////////////////////////////////////////
const username = prompt("Please Tell Us Your Name");

function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
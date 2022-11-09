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

// initialize firebase
firebase.initializeApp(firebaseConfig);

// starts authorization
const auth = firebase.auth();

// next section is for google sign in/sign out on buttons and pop out, etc.
const whenSignedIn = document.querySelector('#whenSignedIn');
const whenSignedOut = document.querySelector('#whenSignedOut');

const signInBtn = document.querySelector('#signInBtn');
const signOutBtn = document.querySelector('#signOutBtn');

const userInfo = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

// logic behind what is hsown on the page for thos signed in or signed out.  
auth.onAuthStateChanged(user =>{
  if(user) {
    //signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userInfo.innerHTML = `<h2>Player: ${user.displayName}!</h2>`;
    const userName = user.displayName;
    console.log(user.displayName);
    console.log(user.uid);
  } else {
    //not signed in
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userInfo.innerHTML = '';
  }
});

// firebase firestore database
const db = firebase.firestore();

///////////////////////////////////////////////////////////

// pull of chat specific id's
const messagesList = document.getElementById('messagesList');
const createChat = document.getElementById('message-btn');


// logic for pushing, pulling, and writing and reading from the firestore database.
let chatsRef;
let unsubscribe;

auth.onAuthStateChanged(user =>{
  if(user) {

    // document
    // .getElementById("messagesList")
    // .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });


    // goes to db and says chatRef is the items written under the chat table.  
    chatsRef = db.collection('chat')


    createChat.onclick = () => {
      // on click gets the message input in the input line, assignes it to message, timestamps it.
      const messageInput = document.getElementById("message-input");
      const message = messageInput.value;
      const timestamp = Date.now();

      // clear the input box
      messageInput.value = "";

      // console.log(message)
      // pulls user id, dispaly name from 'google user' sign in object that is on db in chatsRef.
      chatsRef.add ({
        uid: user.uid,
        name: user.displayName,
        chat: message,
        time: timestamp,
      });
    }

    //pulls data from database that has been written by onclick above.  maps through the data, returns li item with 'name' and 'chat' data from doc.  Assignes it as innerHTML.
    unsubscribe = chatsRef
      .where('uid', '==', user.uid)
      .onSnapshot(querySnapshot => {
        const chatItems = querySnapshot.docs.map(doc => {
          return `<li>${doc.data().name}: ${doc.data().chat}</li>`
        });

        messagesList.innerHTML = chatItems.join('');
      })

  } else {
    // stops form constant running, 
      unsubscribe && unsubscribe();
  }
});

// 1. Corrected imports pointing to Google's hosted web addresses
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, onValue, set, runTransaction } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";


// Your web app's Firebase configuration credentials
const firebaseConfig = {
  apiKey: "AIzaSyBbAtPPqNvqML8xtldVusN9Qmf7Lb-wenI",
  authDomain: "profile-cards-17de5.firebaseapp.com",
  databaseURL: "https://profile-cards-17de5-default-rtdb.firebaseio.com",
  projectId: "profile-cards-17de5",
  storageBucket: "profile-cards-17de5.firebasestorage.app",
  messagingSenderId: "999825218518",
  appId: "1:999825218518:web:1b80fec1a947e4bfd4e277",
  measurementId: "G-G27M67CGB8"
};

// 2. Initialize the Firebase app and connect to your Realtime Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// 3. Declare profileData dynamically so the entire app can access it
let profileData = [];

// 4. Listen to the cloud database path called 'profiles'
onValue(ref(db, 'profiles'), (snapshot) => {
  const data = snapshot.val();
  
  // If the cloud database has cards, use them. 
  // Otherwise, use your 3 original default users as a backup!
  profileData = data || [ 
    {name: "Mark", description: "Mark is a successful influencer since the 80s", img: "images/pp.jpg" },               
    {name: "Sarah", description: "Sarah is a talented creative designer", img: "images/pp.jpg" },
    {name: "John", description: "John loves writing clean back-end code", img: "images/pp.jpg" }
  ];

  // Draw the cards on screen using your function
  generateProfileHTML();
});





const visitorDisplay = document.getElementById('visitorDisplay');
const darkBn = document.getElementById('darkButton');
const profileSection = document.getElementById('profileContainer');
const createUserBtn = document.getElementById('createButton');

const pageHead = document.getElementById('pageHeader');

function generateProfileHTML(){
  profileSection.innerHTML = '';
  profileData.forEach((profile,index)=>{
    profileSection.innerHTML += `<article id="profileCard${index}" class="profile-card">
        <img class="profile-picture" src="${profile.img}" alt="">
        <h3 class="profile-name">${profile.name}</h3>
        <p class="profile-description">${profile.description}</p>
      </article>`;

});
}

function saveProfileDataToCloud(){
  set(ref(db,'profiles'),profileData)
}



if (!localStorage.getItem('isVisited')) {
  // If not counted yet, tell Firebase to increase the score counter by 1 safely
  runTransaction(ref(db, 'visitorCount'), (currentCount) => {
    return (currentCount || 0) + 1;
  });
  
  // Set a local session tag marker so refreshing the browser won't spam counts
  localStorage.setItem('isVisited', 'true');
}

// 3. Listen to the cloud database path called 'visitorCount'
onValue(ref(db, 'visitorCount'), (snapshot) => {
  const count = snapshot.val() || 0;
  // Update the text box live across all users screens!
  visitorDisplay.textContent = ` Visitors so far: ${count}`;
});







createUserBtn.addEventListener(('click'), ()=>{
  if (document.getElementById('userForm'))
     return;
  pageHead.insertAdjacentHTML('beforeend',  `<form id="userForm" class="user-form">
        <input id='nameInput' type="text" placeholder="Name">
        <input id='descInput' type="text" placeholder="Description">
        <button type="button" id="submitUserButton" class="create-button">Create Card</button>
      </form>`);
      const submitUserBtn = document.getElementById('submitUserButton');
      const userForm = document.getElementById('userForm');

      submitUserBtn.addEventListener(('click'), ()=>{
        const nameIn = document.getElementById('nameInput').value;
        const descIn = document.getElementById('descInput').value;
        if (nameIn != '' && descIn != ''){
          profileData.push({name: nameIn, description: descIn, img: "images/pp.jpg"});
          generateProfileHTML();
          saveProfileDataToCloud();
          userForm.remove();
        }
        else {
          generateProfileHTML();
          userForm.remove();
        }
})
})









if (localStorage.getItem('theme') == 'light')
  {
  document.body.classList.toggle('light-mode');
  darkBn.textContent = 'Enable Dark Mode'
  }

darkBn.addEventListener('click',()=>{
  document.body.classList.toggle('light-mode');

  if (document.body.classList.contains('light-mode')) {

  localStorage.setItem('theme', 'light');
  } 
  else 
  {
  localStorage.setItem('theme', 'dark');
  }
  if (darkBn.textContent != 'Enable Dark Mode')
    darkBn.textContent = 'Enable Dark Mode'
  else
    darkBn.textContent = 'Disable Dark Mode'
});














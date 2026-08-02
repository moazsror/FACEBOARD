import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, onValue, set, runTransaction } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";



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


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);



let profileData = [];

onValue(ref(db, 'profiles'), (snapshot) => {
  const data = snapshot.val();
  

  profileData = data || [ 
    {name: "Mark", description: "Mark is a successful influencer since the 80s", img: "images/pp.jpg" },               
    {name: "Sarah", description: "Sarah is a talented creative designer", img: "images/pp.jpg" },
    {name: "John", description: "John loves writing clean back-end code", img: "images/pp.jpg" }
  ];


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
  runTransaction(ref(db, 'visitorCount'), (currentCount) => {
    return (currentCount || 0) + 1;
  });

  localStorage.setItem('isVisited', 'true');
}


onValue(ref(db, 'visitorCount'), (snapshot) => {
  const count = snapshot.val() || 0;
  visitorDisplay.textContent = ` Visitors so far: ${count}`;
});







createUserBtn.addEventListener(('click'), ()=>{
  if (document.getElementById('userForm'))
     return;
  pageHead.insertAdjacentHTML('beforeend',  `<form id="userForm" class="user-form">
        <input id='nameInput' type="text" placeholder="Name">
        <input id='descInput' type="text" placeholder="Description">
        <p class="upload-text">Upload image</p>
        <input id='imgFileInput' class="image-input" type="file" placeholder="Upload a photo" accept="image/*">
        <button type="button" id="submitUserButton" class="create-button">Create Card</button>
      </form>`);
      const submitUserBtn = document.getElementById('submitUserButton');
      const userForm = document.getElementById('userForm');

      submitUserBtn.addEventListener(('click'), ()=>{
        const nameIn = document.getElementById('nameInput').value;
        const descIn = document.getElementById('descInput').value;
        const fileInput = document.getElementById('imgFileInput');
        if (nameIn != '' && descIn != '')
          {
          if (fileInput.files.length > 0) {
            const selectedFile = fileInput.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
              const rawImage = new Image();
              rawImage.src = reader.result;

              rawImage.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const MAX_WIDTH = 200;
                const scaleSize = MAX_WIDTH / rawImage.width;
                canvas.width = MAX_WIDTH;
                canvas.height = rawImage.height * scaleSize;
                ctx.drawImage(rawImage, 0, 0, canvas.width, canvas.height);
                const optimizedBase64String = canvas.toDataURL('image/jpeg', 0.6);
                profileData.push({ name: nameIn, description: descIn, img: optimizedBase64String });
                
                generateProfileHTML();
                saveProfileDataToCloud();
                userForm.remove();
              };
            };

            reader.readAsDataURL(selectedFile);
          } else {
            profileData.push({ name: nameIn, description: descIn, img: "images/pp.jpg" });
            generateProfileHTML();
            saveProfileDataToCloud();
            userForm.remove();
          }
        } else {
          userForm.remove();
        }
      });
    });









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














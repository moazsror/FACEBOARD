const profileData = JSON.parse(localStorage.getItem('profileDataSave')) || [ {name: "Mark", description: "Mark is a successful influencer since the 80s", img: "images/pp.jpg" },               {name: "Sarah", description: "Sarah is a talented creative designer", img: "images/pp.jpg" },
                      {name: "John", description: "John loves writing clean back-end code", img: "images/pp.jpg" }
]

//localStorage.clear();

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

function saveProfileDataToLocalStorage(){
  localStorage.setItem('profileDataSave', JSON.stringify(profileData))
}



generateProfileHTML();






createUserBtn.addEventListener(('click'), ()=>{
  pageHead.innerHTML += `<form id="userForm" class="user-form">
        <input id='nameInput' type="text" placeholder="Name">
        <input id='descInput' type="text" placeholder="Description">
        <button type="button" id="submitUserButton" class="create-button">Create Card</button>
      </form>`
      const submitUserBtn = document.getElementById('submitUserButton');

      submitUserBtn.addEventListener(('click'), ()=>{
        const nameIn = document.getElementById('nameInput').value;
        const descIn = document.getElementById('descInput').value;
        if (nameIn != '' && descIn != ''){
          profileData.push({name: nameIn, description: descIn, img: "images/pp.jpg"});
          pageHead.innerHTML = `<button id="darkButton" class="dark-button">
                Disable Dark Mode
              </button>
              <button id="createButton" class="dark-button">
                Create User Card
              </button>`
          generateProfileHTML();
          saveProfileDataToLocalStorage();
          window.location.reload();
        }
        else {
          pageHead.innerHTML = `<button id="darkButton" class="dark-button">
                Disable Dark Mode
              </button>
              <button id="createButton" class="dark-button">
                Create User Card
              </button>`
          generateProfileHTML();
          window.location.reload();
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














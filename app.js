
const profileData = [ {name: "Mark", description: "Mark is a successful influencer since the 80s", img: "images/pp.jpg" },               {name: "Sarah", description: "Sarah is a talented creative designer", img: "images/pp.jpg" },
                      {name: "John", description: "John loves writing clean back-end code", img: "images/pp.jpg" }
]

const darkBn = document.getElementById('darkButton');
const profileSection = document.getElementById('profileContainer');



  
profileData.forEach((profile,index)=>{
  profileSection.innerHTML += `<article id="profileCard${index}" class="profile-card">
      <img class="profile-picture" src="${profile.img}" alt="">
      <h3 class="profile-name">${profile.name}</h3>
      <button class="add-button">Add</button>
      <p class="profile-description">${profile.description}</p>
    </article>`
})

const allAddButtons = document.querySelectorAll('.add-button');





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








allAddButtons.forEach((button) => {
  button.addEventListener('click', ()=>{
  button.classList.toggle('add-button-clicked');
  
  if (button.textContent != 'Added')
    button.textContent = 'Added';
  else
    button.textContent = 'Add';
  }
);
});




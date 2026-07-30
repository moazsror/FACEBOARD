const joinBn = document.getElementById('joinButton');
const darkBn = document.getElementById('darkButton');


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
})

joinBn.addEventListener('click', ()=>{
  joinBn.classList.toggle('join-button-clicked');
  
  if (joinBn.textContent != 'Joined')
    joinBn.textContent = 'Joined';
  else
    joinBn.textContent = 'Join';
});

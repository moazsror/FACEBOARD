const leftBn = document.getElementById('leftButton');
const middleBn = document.getElementById('middleButton');
const rightBn = document.getElementById('rightButton');
const joinBn = document.getElementById('joinButton');

leftBn.addEventListener('click', () => {
  alert('you clicked the left button');
});


middleBn.addEventListener('click', () =>{
  if (middleBn.textContent != 'clicked')
    middleBn.textContent = 'clicked';
  else
    middleBn.textContent = 'click';
});

rightBn.addEventListener('click', ()=>{
  rightBn.classList.toggle('right-button-clicked');

  if (rightBn.textContent != 'Undo')
    rightBn.textContent = 'Undo';
  else
    rightBn.textContent = 'Change';
});


joinBn.addEventListener('click', ()=>{
  joinBn.classList.toggle('join-button-clicked');
  
  if (joinBn.textContent != 'Joined')
    joinBn.textContent = 'Joined';
  else
    joinBn.textContent = 'Join';
});

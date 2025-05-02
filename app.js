//javaScript


function loadDoc() {
   const xhttp = new XMLHttpRequest();
   xhttp.onload = function() {
     document.getElementById("instructions").innerHTML =
     this.responseText;
   }
   xhttp.open("GET", "GameInstructions.txt");
   xhttp.send();
 }

const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;


//link text
playerLivesCount.textContent = playerLives;

//generate data
const getData = () => [
  {name: 'bunny1', imgSrc: './images/bunny1.jpg'},
  {name: 'bunny2', imgSrc: './images/bunny2.jpg'},
  {name: 'bunny3', imgSrc: './images/bunny3.jpg'},
  {name: 'bunny1', imgSrc: './images/bunny1.jpg'},
  {name: 'bunny2', imgSrc: './images/bunny2.jpg'},
  {name: 'bunny3', imgSrc: './images/bunny3.jpg'}
];

//shuffle card data
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//generate cards
const cardGenerator = () => {
  const cardData = randomize();
  //html
  cardData.forEach((item) => {
  const card = document.createElement('div');
  const face = document.createElement('img');
  const back = document.createElement('div');
  card.classList = 'card';
  face.classList = 'face';
  back.classList = 'back';

  face.src = item.imgSrc;
  card.setAttribute('name', item.name);


  section.appendChild(card);
  card.appendChild(face);
  card.appendChild(back);

  card.addEventListener('click', (e) => {
    card.classList.toggle('toggleCard');
    checkCards(e);
  })
  });
};
//check for match
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.toggleCard');

  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute('name') ===
      flippedCards[1].getAttribute('name')
    ) {
      console.log('match');
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
      });
    } else {
      console.log('wrong');
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('toggleCard'), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if(playerLives === 0) {
        restart('You lost.  Try again!');
      }
    }
  }
  //check for win
  if (toggleCard.length === 6) {
    restart('Congratulations!  You won.');
  }
};

//restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll('.face');
  let cards = document.querySelectorAll('.card');
  section.style.pointerEvents = 'none';
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');

    setTimeout(() => {
      cards[index].style.pointerEvents = 'all';
    faces[index].src = item.imgSrc;
    cards[index].setAttribute('name', item.name);
    section.style.pointerEvents = 'all';
    },  1000);
  });
  playerLives = 6;
  playerLivesCount.textConte = playerLives;
  setTimeout(() => window.alert(text), 500);
};



cardGenerator();


  

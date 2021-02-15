const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const menu = document.querySelector('.menu');
const title = document.querySelector('.title');
let isJumping = false;
let position = 0;
let gameover = false;

function handleKeyUp (event) {
  if (event.keyCode === 32 && !isJumping){
    jump();
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(()=>{
    if (position >= 150) {
      clearInterval(upInterval);

      //descendo
      let downInterval = setInterval(() => {
        if (position <=0){
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      //subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus(){
  if (!gameover) {    
    const cactus = document.createElement('div');
    let cactusPosition = 1500;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
      if (cactusPosition < 0){
        clearInterval(leftInterval);
        background.removeChild(cactus);
      } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
        clearInterval(leftInterval);
        stopGame();
        background.removeChild(cactus);
      } else {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
      }
    }, 20);

    setTimeout(createCactus, randomTime);
  }
}

document.addEventListener('keypress', handleKeyUp);

function startGame() {
  gameover = false;
  createCactus();
  menu.style.opacity = '0';
  background.style.animationName = 'slideright';
  title.innerHTML = 'Dino Game Clone';
}

function stopGame() {
  menu.style.opacity = '1';
  background.style.animationName = 'none';
  title.innerHTML = 'Game Over';
  gameover = true;
}
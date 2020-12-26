//Controler variable
let positionX = 1;
let positionY = 1;
let diretionX = 1010;
let diretionY = 410;
let velocityGame = 5;
let velocityJump = 7;
let animation;
let anigravity;

function render(){
    gravity() 
    moveFloor()
}

render



window.addEventListener('keydown', (key) => {
    if (key.keyCode === 32 && diretionY === 410) {
        jump()
    }
})


function gravity(){
    if (diretionY < 410){
        diretionY+= positionY * velocityJump;
        let player = document.getElementById('player');
        player.style.top = diretionY +'px'
        console.log(diretionY);
        console.log(diretionY);
        anigravity = requestAnimationFrame(gravity)
    }
}

function jump(){
    if (diretionY > 240){
        diretionY-= positionY * velocityJump;
        let player = document.getElementById('player');
        player.style.top = diretionY +'px'
        animation = requestAnimationFrame(jump)
    }else{
        gravity()
    }
}

function moveFloor(){
    diretionX-= positionX + velocityGame;
    let cactus = document.getElementById('cactus');
    let floor = document.getElementById('floor');
    cactus.style.left = diretionX + 'px'
    floor.style.left = diretionX + 'px'
    console.log(diretionX);
    animation = requestAnimationFrame(moveFloor)
}
let positionX; let positionY;
let diretionX; let diretionY; let positionCactusUm; let positionCactusDois;
let velocity; let velocityParalax;
let paralaxX;
let score;
let animaWorld; let animaGravity; let animaJump;
let cactusUm; 
let cactusDois;
let dino;
let mountain;
let sand;
let sandCactus;
let floor;

document.getElementById('reset').addEventListener('click', ()=>{
    start()
    document.getElementById('gameOver').style.visibility = 'hidden'
    document.getElementById('reset').style.visibility = 'hidden'
})

document.getElementById('play').addEventListener('click', ()=>{
    const menu = document.getElementById('startMenu');
    document.body.removeChild(menu);
    document.getElementById('myGame').setAttribute('class', 'intro')
    setTimeout(() => {
        start()
    }, 2000);
})

window.addEventListener('keydown', (key) => {
    if (key.keyCode === 32 && diretionY >= 420) {
        jump()
        const soundJump = new Audio('/assets/music/jump.mp3')
        soundJump.play()
    }
})

function start(){
    positionX = 1; positionY = 1;
    diretionX = 0; diretionY = 420; positionCactusUm = 2095; positionCactusDois = 2695;
    velocity = 5; velocityParalax = 0.3;
    paralaxX = 0;
    score = 0;
    cactusUm = document.getElementById('cactus-um'); 
    cactusDois = document.getElementById('cactus-dois');
    dino = document.getElementById('dino');
    mountain = document.getElementById('mountain');
    sand = document.getElementById('sand');
    sandCactus = document.getElementById('sand-cactus');
    floor = document.getElementById('floor');
    dino.setAttribute('class', 'dinoRunner')
    dino.style.top = `${diretionY}px`
    gravity() 
    render()
}

function gravity(){
    if (diretionY < 420){
        diretionY+= positionY * velocity;
        dino.style.top = `${diretionY}px`
        console.log(diretionY);
        if (diretionY >= 420) {
            diretionX = 420
            dino.removeAttribute('class')
            dino.setAttribute('class','dinoRunner')
        }
    animaGravity = requestAnimationFrame(gravity)
    }
}

function jump(){
    cancelAnimationFrame(animaGravity)
    dino.setAttribute('class', 'dinoJump')
    if (diretionY > 270){
        diretionY-= positionY * velocity;
        dino.style.top = `${diretionY}px`
        animaJump = requestAnimationFrame(jump)
    }else{
        gravity()
    }
    
}

function render(){
    diretionX-= positionX * velocity
    paralaxX-= positionX * velocityParalax
    mountain.style.backgroundPositionX = `${paralaxX}px`
    let x = paralaxX + paralaxX
    sand.style.backgroundPositionX = `${x}px`
    sandCactus.style.backgroundPositionX = `${x}px`
    floor.style.backgroundPositionX = `${diretionX}px`
    raspawCactus()
    let status = hasCollision()
    velocity+= 0.005
    score++
    document.getElementById('scores').innerHTML = score;
    animaWorld = requestAnimationFrame(render)
    stop(status)
}

function raspawCactus(){
    positionCactusUm-= positionX * velocity
    positionCactusDois-= positionX * velocity
    cactusUm.style.left = `${positionCactusUm}px`
    cactusDois.style.left = `${positionCactusDois}px`
    if (positionCactusUm <= -65 ){
        positionCactusUm = 1095
    }
    if (positionCactusDois <= -65){
        positionCactusDois = 1095
    }
}

function hasCollision(){
    if (positionCactusUm < 175 && diretionY > 360 && positionCactusUm > 95){
        dino.setAttribute('class', 'dinoDead')
        return true;
    }else if (positionCactusDois < 175 && diretionY > 360 && positionCactusDois > 95){
        dino.setAttribute('class', 'dinoDead')
        return true;
    }
    return false;
}

function stop(status){
    if (status){
        diretionY = 0
        cancelAnimationFrame(animaGravity)
        cancelAnimationFrame(animaJump)
        cancelAnimationFrame(animaWorld)
        document.getElementById('highScore').innerHTML = `HIGHSCORE : ${score}`
        document.getElementById('gameOver').style.visibility = 'visible'
        document.getElementById('reset').style.visibility = 'visible'
    }
}
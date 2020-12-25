//Controler variable
let positionX = 1;
let positionY = 1;
let diretionX = 0;
let diretionY = 0;
let velocity;
let animation;

function render(){
    velocity = 0.5;
    gravity(positionY, velocity)
    animation = requestAnimationFrame(render)
}

function gravity(positionY,  velocity){
    let pY = positionY;
    let vel = velocity;
    if (diretionY < 70){
        diretionY+= pY * vel;
        console.log(diretionY);
        let player = document.getElementById('player');
        player.style.top = diretionY +'%'
    }    
}
var game;
// setting game options
var gameOption = {
    platformSpeedRange: [300, 300],
    mountainSpeed: 80,
    spawnRange: [80, 300],
    platformSizeRange: [90, 300],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 50,
    maxJumps: 2,
};

window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 400,
        scene: [initGame, gameplay],
        backgroundColor: 0x0c88c7,
        // physics settings
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

function resize() {
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
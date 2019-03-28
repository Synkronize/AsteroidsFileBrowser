let black = '#000000';
let ship;
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,

    }

};

var game = new Phaser.Game(config);
function preload(){
    this.load.setBaseURL('http://labs.phaser.io');
    
    this.load.image('ship', 'assets/sprites/asteroids_ship_white.png');
}

function create(){
    console.log(this.cameras);
    ship = this.physics.add.image(400, 300, 'ship');
    ship.setVelocity(0, 0);
    ship.setCollideWorldBounds(false);
    emitter.startFollow(logo);
    this.cameras.main.setBackgroundColor();

}
function update(){
    this.physics.world.wrap(logo);
}
create();

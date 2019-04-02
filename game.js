// Necessary Variables.
let black = '#000000';
let ship;
let bullets;
let ACCELERATION = 100;
let ROTATIONSPEED = 180;
let accelKey;

// Configuration of the game environment.
// Scalar lets game scale to the size of the electron window.
let config = {
    type: Phaser.AUTO,
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

    },
    scale:{
        mode: Phaser.Scale.RESIZE,
       
    }

};

//Make game object
var game = new Phaser.Game(config);

// preload function, before we create the scene this is whats done for the scene.
function preload(){    
    this.load.image('ship', 'Ship.png');
    this.load.image('bullet', 'Bullet.png');
}

// Run this code when the scene is created.
//  Place the ship in the scene
//  Set no collision on scene borders
// Set the origin point of the ship to be the middle.
// Background color black, assign some event handlers, and define more aspects of the ship.
function create(){
    accelKey = this.input.keyboard.addKey('UP');
    ship = this.physics.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'ship');
    ship.setVelocity(0, 0);
    ship.setCollideWorldBounds(false);
    ship.setOrigin(0.5, 0.5);
    ship.setMaxVelocity(500);
    ship.setDrag(100);
    ship.setSize(17,25);
    this.cameras.main.setBackgroundColor();
    this.input.keyboard.on('keyup-UP', slowDown);
    this.input.keyboard.on('keydown-LEFT', rotateLeft);
    this.input.keyboard.on('keydown-RIGHT', rotateRight);
    this.input.keyboard.on('keyup-LEFT', stopRotating);
    this.input.keyboard.on('keyup-RIGHT', stopRotating);

    // Turn on physics debugging to show player's hitbox
    this.physics.world.createDebugGraphic();
    bullets = this.physics.add.group();
    this.input.keyboard.on('keydown-SPACE', shoot);

}
function resetBullet(){
    bullet.kill();
}
// Update is a continuously running function in scene, 
// polling is used here for accelerate so that the proper rotation is captured every time.
function update(){
    this.physics.world.wrap(ship);
    if(accelKey.isDown)
        accelerate();
  

}

 

create();

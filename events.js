// Give the ship x and y acceleration based on it's rotation.
function accelerate(){
    ship.setAccelerationX(Math.cos(ship.rotation) * ACCELERATION);
    ship.setAccelerationY(Math.sin(ship.rotation) * ACCELERATION);
}
// Set acceleration to 0, so that drag can go into effect.
function slowDown(){
    ship.setAcceleration(0);
    
}

// Rotate object counter clockwise
function rotateLeft(){
    ship.setAngularVelocity(-1 * ROTATIONSPEED);
}

// Rotate Object clockwise
function rotateRight(){
    ship.setAngularVelocity(ROTATIONSPEED);
}

// Stop rotating
function stopRotating(){
    ship.setAngularVelocity(0);
}

function shoot(){
    bullets.create(ship.x, 290, 'bullet');
    bullets.setVelocityX(Math.cos(ship.rotation) * 300);
    bullets.setVelocityY(Math.sin(ship.rotation) * 300);
}
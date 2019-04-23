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

//  Create a bullet add it to the group and give it a velocity.
function shoot(){
    let bullet = bullets.create(ship.x, ship.y, 'bullet');
    bullet.setVelocityX(Math.cos(ship.rotation) * 300);
    bullet.setVelocityY(Math.sin(ship.rotation) * 300);
}
//  This function does nothing if there is no previous set of files to view.
// It "changes the page", if there is a previous set of files.  
function previousSetOfFiles(){
    if(currentFileIndex-7 <= 0){
        return;
    }
    // Need to go back 14 spaces to get a previous page/set of files.
    currentFileIndex -= (NUMBEROFFILES*2);
    if(currentFileIndex < 0)
        currentFileIndex = 0;
    // clear out all the text and asteroids.
    asteroids.clear(true, true);
    texts.clear(true,true);
    
    // recreate the text and asteroids the same way as the create() method.
    for (let i = 0; i < NUMBEROFFILES; i++) {
        let asteroid;
        if(isDirectory(fileList[currentFileIndex+i]))
             asteroid = asteroids.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), 'asteroid' + Phaser.Math.Between(6, 7));
        else
             asteroid = asteroids.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), 'asteroid' + Phaser.Math.Between(1, 5));
        asteroid.setCollideWorldBounds(false);
        let text = testScene.add.text(asteroid.getCenter().x, asteroid.getCenter().y, fileList[currentFileIndex+i], { fontFamily: '"Roboto Condensed"' });
        text.setOrigin(0.5);
        asteroid.setVelocityX(Phaser.Math.Between(0, 100));
        asteroid.setVelocityY(Phaser.Math.Between(0, 100));
        texts.add(text);
        
    }
    // After we've created the asteroids the next time we call this function we'll be starting at the beginning of the next 7 files.
    currentFileIndex += 7;

}
// Mostly the same as previousSetOfFiles but instead this one moves forward. Does nothing if the directory has no files.
// Also does nothing if the current file index is the same as the length of the fileList (we've reached the end).
function nextSetOfFiles(){
    if(fileList.length == 0){
        asteroids.clear(true, true);
        texts.clear(true, true);
        return;
    }
    if(currentFileIndex == fileList.length){
        return;
    }
    // If the file list has less than 7 more files, then just create the last bit of asteroids.
    if (currentFileIndex + 7 > fileList.length){
        asteroids.clear(true,true);
        texts.clear(true,true);
        for(let i = currentFileIndex; i < fileList.length; i++){
            let asteroid
            if (isDirectory(fileList[i]))
                asteroid = asteroids.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), 'asteroid' + Phaser.Math.Between(6, 7));
            else
                asteroid = asteroids.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), 'asteroid' + Phaser.Math.Between(1, 5));
            asteroid.setCollideWorldBounds(false);
            let text = testScene.add.text(asteroid.getCenter().x, asteroid.getCenter().y, fileList[i], { fontFamily: '"Roboto Condensed"' });
            text.setOrigin(0.5);
            asteroid.setVelocityX(Phaser.Math.Between(0, 100));
            asteroid.setVelocityY(Phaser.Math.Between(0, 100));
            texts.add(text);
        }
        
        return;

    }
    
    // else, clear the scene out and create the next 7 files/directories.
    asteroids.clear(true, true);
    texts.clear(true, true);
    for (let i = 0; i < NUMBEROFFILES; i++) {
        if(i + currentFileIndex >= fileList.length)
            break;
        let asteroid;
        if (isDirectory(fileList[i + currentFileIndex]))
            asteroid = asteroids.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), 'asteroid' + Phaser.Math.Between(6, 7));
        else
            asteroid = asteroids.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), 'asteroid' + Phaser.Math.Between(1, 5));        asteroid.setCollideWorldBounds(false);
        let text = testScene.add.text(asteroid.getCenter().x, asteroid.getCenter().y, fileList[i + currentFileIndex], { fontFamily: '"Roboto Condensed"' });
        text.setOrigin(0.5);
        asteroid.setVelocityX(Phaser.Math.Between(0, 100));
        asteroid.setVelocityY(Phaser.Math.Between(0, 100));
        texts.add(text);
    }
    currentFileIndex += 7;


}
// option is passed a value by context from where the event handlers are assigned. 
// it sets one of the operation's flag values to true.
function option(){
    showInput();
    pause();
    if(this.option == 'deleteFolder'){
        optionSet['delete'] = true;
    }
    optionSet[this.option] = true;
    

}


function pause(){
    testScene.scene.pause();
}

function resume(){
    testScene.scene.resume();

}
// This clears out all the asteroids, and creates one asteroid that is the file that has been selected to delete.
// It informs the user that the program is in delete mode.
function deleteMode(fileName){
    asteroids.clear(true, true);
    texts.clear(true, true);
    let asteroid;
    if (isDirectory(fileName))
        asteroid = asteroids.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), 'asteroid' + Phaser.Math.Between(6, 7));
    else
        asteroid = asteroids.create(Phaser.Math.Between(0, game.config.width), Phaser.Math.Between(0, game.config.height), 'asteroid' + Phaser.Math.Between(1, 5));    asteroid.setCollideWorldBounds(false);
    let text = testScene.add.text(asteroid.getCenter().x, asteroid.getCenter().y, fileName, { fontFamily: '"Roboto Condensed"' });
    text.setOrigin(0.5);
    asteroid.setVelocityX(Phaser.Math.Between(0, 100));
    asteroid.setVelocityY(Phaser.Math.Between(0, 100));
    texts.add(text);
    let systemText = testScene.add.text(10, 200, 'Deleting: ' + fileName + '\n' + 'Shoot to confirm, shift to cancel', { fontFamily: '"Roboto Condensed"' });
    systemText.name = 'delete';
    systemInformationTexts.add(systemText);
    
}
// Saves the current file's path and informs the user that the program is in copy mode.
function copyFile(fileName){
    clipboard.path = currentDirectory + '\\' + fileName;
    clipboard.fileName = fileName;
    let text = testScene.add.text(10, 150,'Clipboard: ' + fileName + '\n' + 'Press P to paste or M to move.', { fontFamily: '"Roboto Condensed"' });
    text.name = 'clipboard';
    systemInformationTexts.add(text);
}

// Displays the info of a file 
function displayInfo(fileName){
    let stats = getInfo(fileName);
    let text = testScene.add.text(10, 10,
        'Filename: ' + fileName + '\n'
        + 'File path: ' + currentDirectory + '\\' + fileName + '\n'
        + 'Creation Time: ' + stats.birthtime + '\n'
        + 'Modified Time: ' + stats.mtime + '\n'
        + 'Size: ' + stats.size + ' Bytes' + '\n', { fontFamily: '"Roboto Condensed"' });
    text.name = 'stats'
    systemInformationTexts.add(text);

}
// Clears out most of the system text that is created from the various operations.
function closeFileStats(){
    systemInformationTexts.remove(findTextObjInGroup('stats'), true, true);
    systemInformationTexts.remove(findTextObjInGroup('create'),true,true);
    systemInformationTexts.remove(findTextObjInGroup('createF'),true,true);
    systemInformationTexts.remove(findTextObjInGroup('copy'), true, true);
    systemInformationTexts.remove(findTextObjInGroup('move'), true, true);
}

// This function is used to locate a text object with a given name, it returns the object.
function findTextObjInGroup(textName){
    let systemTextArray = systemInformationTexts.getChildren()
    for(let i = 0; i < systemTextArray.length; i++)
        if (systemTextArray[i].name == textName)
            return systemTextArray[i];
}

// Cancels delete mode.
function cancelDelete(){
    if(optionSet.delete){
        optionSet.delete = false;
        optionSet.deleteFolder = false;
        systemInformationTexts.remove(findTextObjInGroup('delete'), true, true);
        vm.userInput('');
        refresh();
    }
}

// Creates a new header based on current directory.
function constructCurrentDirectoryHeader(){
    if(header){
        header.destroy(true, true);
    }
    header = testScene.add.text(game.scale.width/2, 10, currentDirectory, { fontFamily: '"Roboto Condensed"' });
}
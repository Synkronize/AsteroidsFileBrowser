// Necessary Variables.
let black = '#000000';
let ship;
let bullets;
let ACCELERATION = 150;
let ROTATIONSPEED = 180;
let accelKey;
let asteroids;
let texts;
let currentDirectory = require('os').homedir();
// Import knockout to easily query the textbox
let knockout = require('knockout')
let systemInformationTexts;
let fileList = getFiles(currentDirectory);
let slash;
let platform = window.navigator.platform
if(platform.includes('Windows'))
    slash = '\\';
else
    slash = '/';
console.log(window.navigator.platform);
let currentFileIndex = 0;
// Amount of files that will be displayed in the scene.
let NUMBEROFFILES = 7;
// Variable that references the scene in other places so the scene can be accessed.
let testScene;
let input;
let header;
let clipboard = {path: '', fileName: ''};
var ko = require('knockout')
let vm = {
    inputVisible: ko.observable(false),
    showInput: showInput,
    hideInput: hideInput,
    userInput: ko.observable(),
}
// option set helps the game know what it should be doing after certain keypresses.
let optionSet = {createFile: false, delete: false, deleteFolder: false, createFolder:false, copyFile:false, fileInfo:false};

// Knockout interface. Subscribe runs when the enter key is pressed in the text box
vm.userInput.subscribe(function (newValue) {
    input = newValue
    // Once Enter is pressed here, the optionSet will have certain flags set.  Depending on the option set an event handler will be called.
    // example: if createFile is true, then the createFile function will be ran.
    if(input !='!cancel'){
        if(optionSet.createFile){
            createFile(input);
            optionSet.createFile = false;
            vm.userInput('');
            refresh();

        }
        else if(optionSet.delete){
            deleteMode(input);
        }
        else if(optionSet.createFolder){
            createFolder(input);
            optionSet.createFolder = false;
            vm.userInput('');
        }
        else if(optionSet.copyFile){
            copyFile(input);
            optionSet.copyFile = false;
            vm.userInput('');

        }
        else if(optionSet.fileInfo){
            displayInfo(input);
            optionSet.fileInfo = false;
            vm.userInput('');

        }
        
    }
    else{
        Object.keys(optionSet).forEach((key) => {
            optionSet[key] = false;
        });
    }
    resume();
    hideInput();
})
// Buttons for input field.
function showInput() {
    vm.inputVisible(true)
}

function hideInput() {
    vm.inputVisible(false)
}

// binds the model to knockout.
ko.applyBindings(vm)




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
    this.load.html('form', 'input.html');   
    for(let i = 1; i < 8; i++)
        this.load.image('asteroid' + i,'asteroid' + i +'.png');
}

// Run this code when the scene is created.
//  Place the ship in the scene
//  Set no collision on scene borders
// Set the origin point of the ship to be the middle.
// Background color black, assign some event handlers, and define more aspects of the ship.
function create(){
    testScene = this;
    accelKey = this.input.keyboard.addKey('UP');
    // place ship in scene and give it some physics properties.
    ship = this.physics.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'ship');
    ship.setVelocity(0, 0);
    ship.setCollideWorldBounds(false);
    ship.setOrigin(0.5, 0.5);
    ship.setMaxVelocity(500);
    ship.setDrag(50);
    ship.setSize(17,25);
    this.cameras.main.setBackgroundColor();

    // bind event handlers to keys.
    this.input.keyboard.on('keyup-UP', slowDown);
    this.input.keyboard.on('keydown-LEFT', rotateLeft);
    this.input.keyboard.on('keydown-RIGHT', rotateRight);
    this.input.keyboard.on('keyup-LEFT', stopRotating);
    this.input.keyboard.on('keyup-RIGHT', stopRotating);
    this.input.keyboard.on('keyup-Q', previousSetOfFiles);
    this.input.keyboard.on('keyup-W', nextSetOfFiles);
    this.input.keyboard.on('keyup-B', getParentDirectory)
    this.input.keyboard.on('keydown-N', option, {option: 'createFile'});
    this.input.keyboard.on('keydown-D', option, {option: 'delete'});
    this.input.keyboard.on('keydown-F', option, {option: 'createFolder'})
    this.input.keyboard.on('keydown-R', option, {option: 'deleteFolder'})
    this.input.keyboard.on('keydown-C', option, {option: 'copyFile'});
    this.input.keyboard.on('keydown-P', pasteFile);
    this.input.keyboard.on('keydown-M', moveFile);
    this.input.keyboard.on('keydown-I', option, {option: 'fileInfo'});
    this.input.keyboard.on('keydown-TAB', closeFileStats);
    this.input.keyboard.on('keyup-SHIFT', cancelDelete);
    this.input.keyboard.on('keydown-SPACE', shoot);

    // create the header that tells the user what directory they are in.
    constructCurrentDirectoryHeader();

    
    // create a bullets group, an asteroids group, a texts group, and finally a system text group.
    bullets = this.physics.add.group();
    asteroids = this.physics.add.group();
    texts = this.add.group();
    systemInformationTexts = this.add.group();
    
    // Finally populate the scene with the asteroids/files.
    nextSetOfFiles();

}

// Update is a continuously running function in scene, 
// polling is used here for accelerate so that the proper rotation is captured every time.
function update(){
    this.physics.world.wrap(ship);
    this.physics.world.wrap(asteroids);
    if(accelKey.isDown)
        accelerate();

    // this loop allows the text objects (filenames) to stay "attached" to the center of the asteroids
    for(let i = 0; i < texts.getChildren().length; i++){
        texts.getChildren()[i].x = asteroids.getChildren()[i].x;
        texts.getChildren()[i].y = asteroids.getChildren()[i].y;
    }
    // Collision handler for bullets and asteroids.
    this.physics.collide(bullets, asteroids, (bullet, asteroid) =>{
        // if there is collision, we have find out the index of the asteroid in it's group which should be the same as the index of the text (in its group).
        // this allows us to get rid of both objects and "links" them.
        textsList = texts.getChildren();
        let i;
        let asteroidList = asteroids.getChildren()
        for(i = 0; i < asteroidList.length; i++ ){
            if(asteroid == asteroidList[i])
                break;
        }
        // If a bullet and asteroid collide and the delete flag is enabled then delete the file or folder.
        if(optionSet.delete){
            optionSet.delete = false;
            if(optionSet.deleteFolder){
                optionSet.deleteFolder  = false;
                deleteFolder(textsList[i].text);
            }
            else
                deleteFile(textsList[i].text);
            vm.userInput('');
            systemInformationTexts.remove(findTextObjInGroup('delete'), true, true);
            refresh();
        }
        // If the delete flag isn't set and the bullet hits a directory, then navigate to the directory.
        if(isDirectory(textsList[i].text))
            goToNewDirectory(textsList[i].text)
        
        
        bullet.destroy();
       
    });
    // let the ship be bounced around by meteors.
    this.physics.collide(ship, asteroids); 
}

 
// start the game
create();

//Import electron
const {app, BrowserWindow} = require('electron');
// Create browser window
function createWindow(){
    let win = new BrowserWindow({width: 800, height: 600});
    win.setTitle('Asteroids File Browser')
    win.loadFile('index.html');
    win.on('close', () =>{
        win = null;
    });
    
}
app.on('ready', createWindow);



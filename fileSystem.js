const fs = require('fs-extra');
// Get a list of all the files in the path
function getFiles(path){
    return fs.readdirSync(path);
}
// Return the path of the directory above using regex.
function getParentDirectory(){
    let regex = /\\/g;
    let matches;
    let indexes = [];
    // find the index of the last \ in the path string.
    while ((matches = regex.exec(currentDirectory)) != null){
        indexes.push(matches.index);
    }
    // cut off everything that comes right after the character that is before the last \ in the path string.
    currentDirectory = currentDirectory.substring(0, indexes[indexes.length - 1]);
    // if we end up at C: then make it C:\
    if(regex.exec(currentDirectory) == null)
        currentDirectory  += '\\';
    // refresh the scene.
    refresh();
    constructCurrentDirectoryHeader();
}

// is the file passed in a directory?
function isDirectory(file){
    return fs.statSync(currentDirectory + '\\' + file).isDirectory();
}

function updateFileList(){
    fileList = getFiles(currentDirectory);
}
// Go to the directory and refresh the scene.
function goToNewDirectory(directoryName){
    currentDirectory += '\\' + directoryName;
    constructCurrentDirectoryHeader();
    refresh();
}

// Create a file, and create some system text to display to the user that the file was created.
function createFile(fileName){
    fs.writeFileSync(currentDirectory + '\\' + fileName, '');
    let systemText = testScene.add.text(10, 200, 'Created File: ' + fileName + '\n' + 'in\n' + currentDirectory, { fontFamily: '"Roboto Condensed"' });
    systemText.name = 'create';
    systemInformationTexts.add(systemText);
}

// refresh the scene
function refresh(){
    currentFileIndex = 0;
    updateFileList();
    nextSetOfFiles();
}


function deleteFile(fileName){
    fs.unlinkSync(currentDirectory + '\\' + fileName, '');
}

// create a folder, and create some system text to display to the user that the directory was created.
// Also navigate into it.
function createFolder(folderName){
    fs.mkdirSync(currentDirectory + '\\' + folderName);
    let systemText = testScene.add.text(10, 200, 'Created Folder: ' + folderName + '\n' + 'in\n' + currentDirectory, { fontFamily: '"Roboto Condensed"' });
    systemText.name = 'createF';
    systemInformationTexts.add(systemText);
    goToNewDirectory(folderName);
}

function deleteFolder(folderName){
    fs.removeSync(currentDirectory + '\\' + folderName);

}

// Copy the file into the current directory, display system text to inform user.
function pasteFile(){
    fs.copyFileSync(clipboard.path, currentDirectory + '\\' + clipboard.fileName);
    systemInformationTexts.remove(findTextObjInGroup('clipboard'), true, true);
    let systemText = testScene.add.text(10, 350, 'Copied File: ' + clipboard.fileName + '\n' + 'in to\n' + currentDirectory, { fontFamily: '"Roboto Condensed"' });
    systemText.name = 'copy';
    systemInformationTexts.add(systemText);
    refresh();

}
// Move file into current directory, display system text to inform user.
function moveFile(){
    fs.moveSync(clipboard.path, currentDirectory + '\\' + clipboard.fileName);
    systemInformationTexts.remove(findTextObjInGroup('clipboard'), true, true);
    let systemText = testScene.add.text(10, 350, 'Moved File: ' + clipboard.fileName + ' from\n' + clipboard.path + 
    ' to\n' + currentDirectory, { fontFamily: '"Roboto Condensed"' });
    systemText.name = 'move';
    systemInformationTexts.add(systemText);
    refresh();
}

// get the statistic information of a file.
function getInfo(fileName){
    return fs.statSync(currentDirectory + '\\' + fileName);
}
# Project Title

Asteroids File Browser

## Built With

* [Phaser 3](https://phaser.io/) - A fast, fun and free open source HTML5 game framework.

* [fs-extra](https://github.com/jprichardson/node-fs-extra) fs-extra adds file system methods that aren't included in the native fs module and adds promise support to the fs methods. It also uses graceful-fs to prevent EMFILE errors. It should be a drop in replacement for fs.

* [Knockout.js] (https://knockoutjs.com/) - Knockout makes it easier to create rich, responsive UIs with JavaScript.

* [Electron](https://electronjs.org/) - Build cross platform desktop apps with JavaScript, HTML, and CSS.


## How to use
After the necessary packages have been installed, simply run npm start.

- The blue asteroids are directories and the black
asteroids are files.
- The black triangle in the middle is you ship.
- Controls
    - Left and Right Arrow
        - rotate the ship
    - Spacebar
        - Shoot
        - Shooting a directory will move you into the
        directory.
    - Up
        - move in the direction you are facing.
    - Q
        - Displays the previous set of Files. (7 Files
        are displayed at a time)
    - W
        - Displays the next set of Files
    - B
        - Go up one Directory
    - N
        - Create a file. The game will pause and the
        textbox will open. Type in the name of the
        new file.
    - D
        - Delete a file. The game will pause and the
        textbox will open. Type in the name of the
        file that is to be deleted. The game will
        isolate the file and you can shoot the file to
        confirm deletion.
    - F
        - Creates a folder. The process is the same as
        creating a file. Except when the folder is
        created you will be moved into that directory.
    - R
        - Deletes a folder, works the same way as
        deleting a file.
    - C
        - Copy, the game will pause and the text box
        will open. Upon pressing enter the game will
        copy the path of a file to the “clipboard”. After
        using copy you can then use the Paste and
        Move features.
            - P
                - Paste, this is the actual copy
                feature. It will paste the file into the
                directory that you are currently in.
            - M
                - Move, moves the file into the
                directory you are currently in.
                - ***ADDITIONAL FEATURE**
                - Move can also move
                directories! (Not specified in
                the PDF as a required feature).
    - I
        - File Info, the game will pause and the
        textbox will open. Upon pressing enter the
        game will display the information about the
        file on the left side of the screen.
    - TAB
        - Closes any system text, some system text is
        removed after an action is taken. But certain
        information will persist these are dismissed
        by pressing TAB. 
    - SHIFT
        - Cancels deletion
- That is the end of the controls, a couple of
disclaimers:
- When the game is in pause mode type in !cancel
into the textbox to cancel the operation.
- This game is still in a very early version, it
does not work on Linux (at least not on my
system).
- And you must try to commit to one operation
at a time as there may be parts of the code
that intertwine in ways that I have not
perceived yet. As in do not try to move a file
while trying to delete a file.
- The Project PDF did not specify how to
handle moving files/folders into a directory
that already has a file/folder of the same
name. May have unintended consequences.
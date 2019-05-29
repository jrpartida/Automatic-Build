Author: Ramón Partida.<br/>
Last updated: jan/04/2019<br/>

## Synopsis
---------------
Script that automatically pulls the most recent changes from Perforce and afterwards makes a game build.

# Download/Install
---------------------------------------
1. Clone or download this project.
2. Make sure you have installed the following components:<br/>
    * Gulp Local Version 4.0.0 [Tutorial](https://gulpjs.com/docs/en/getting-started/quick-start)<br/>
    * CLI Version 2.0.1<br/>
    * Node v10.14.1            [Download link](https://nodejs.org/es/download/releases/)<br/>
3. Replace the contents between < > with your own information. 

# How to use 
---------------------------------------
1. Open Task Scheduler.
2. Action > Create Task.
3. Give the taks a name.
4. Under the *Triggers* tab select *Daily* and pick an hour.
5. Under the *Action* tab select *Start a program*.
    1. In the *Program/Script* field type the following: C:\Windows\System32\cmd.exe
    2. In the *Add argument* filed type the following: gulp
    3. In the *Start in* field type the path that contains your gulp file.

## Tests
---------------
1. Press WIN+R and type "cmd" and press Enter.
2. Go to the path where your gulp file is (e.g "cd C:/Users/Name/Desktop").
3. Type "gulp" and press Enter.

***Remember to change the contents of the script to fit your project***

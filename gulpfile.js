////////////////////////////////////////////////////////
//////////                                    //////////
//////////        LAND OF THE FORGOTTEN       //////////
//////////       GULPFILE AUTOMATIC BUILD     //////////
//////////  Copyright (C) 2018 Ramon Partida  //////////
//////////                                    //////////
//////////      Gulp Local Version 4.0.0      //////////
//////////          CLI Version 2.0.1         //////////
//////////            Node v10.14.1           //////////
//////////                                    //////////
////////////////////////////////////////////////////////

const gulp  = require('gulp');
const shell = require('gulp-shell');
const fs    = require('fs');
const log   = require('fancy-log');

const FOLDERS = [
	"<H:\\Build\\>today",
	"<H:\\Build\\>yesterday",
	"<H:\\Build\\>older"

];
const BUILDPATH = "<C:/Users/location>";
const PROJECTPATH = "<C:/Users/project>";
const UNITYPATH = "<C:/Program Files/Unity/Hub/Editor/20XX.X.XXXX/Editor/Unity.exe>"
const PROJECTDIR = "<C:/DestinationFolder>"

// Perfocer Sync //
gulp.task('p4port' , shell.task('p4 set P4PORT=perforce:<port number>'));
gulp.task('p4Log'  , shell.task( 'p4 set P4CLIENT=<perforce client>'));
gulp.task('p4sync' , shell.task('p4 sync'));
gulp.task('p4set'  , shell.task('p4 set'));

gulp.task('unityBuild', 
    shell.task(`"${UNITYPATH}" -batchmode -logFile README.log -projectPath "${PROJECTPATH}" -buildWindows64Player "${BUILDPATH}/<appName>.exe" -stackTraceLogType Full -quit`)
);

gulp.task('modifyLog',
    shell.task(`@echo Find any errors and/or warnings below >> "${BUILDPATH}/README.log"`)
);

gulp.task('showingErrors',
    shell.task(`findstr /b "WARNING ERROR" "${BUILDPATH}/README.log" >> "${BUILDPATH}/README.log"`)
);

gulp.task('modifyLogP4',
	shell.task(`@echo Changelist for this build below >> "${BUILDPATH}/README.log"`)
);

gulp.task('showP4Changelist',
	shell.task(`p4 changes -m 10 "${PROJECTDIR}"#have >> "${BUILDPATH}/README.log"`)
);

gulp.task('cleanUp',
    shell.task(`del "${BUILDPATH}\\UnityCrashHandler64.exe"`)
);
// Create folders for build //
gulp.task('createFolderStructure', async () =>{
    
    FOLDERS.forEach(dir => {
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            log('folder created:', dir);
        }
    });
});

// Folder re-structure //
gulp.task('removeFolder', 
    shell.task(`rmdir /Q /S "${FOLDERS[2]}"`)
);

gulp.task('moveToOlder',
    shell.task(`move "${FOLDERS[1]}" "${FOLDERS[2]}"`)
    );
    
    gulp.task('moveToYesterday', 
    shell.task(`move "${FOLDERS[0]}" "${FOLDERS[1]}"`)
);

gulp.task('createToday', async() => {
    if(!fs.existsSync(FOLDERS[0])) {
        fs.mkdirSync(FOLDERS[0])
        log('folder created: ', FOLDERS[0]);
    }
});

gulp.task('moveToFolder',
    shell.task(`Xcopy "${BUILDPATH}" "${FOLDERS[0]}" /E /Y`)
);

// Call my tasks //
gulp.task('p4'     , gulp.series('p4port','p4Log','p4sync','p4set'));
gulp.task('build'  , gulp.series('unityBuild', 'modifyLog', 'showingErrors', 'modifyLogP4', 'showP4Changelist', 'cleanUp'));
gulp.task('folder' , gulp.series('createFolderStructure', 'removeFolder', 'moveToOlder', 'moveToYesterday', 'createToday', 'moveToFolder'));
gulp.task('default', gulp.series('p4', 'build', 'folder') );



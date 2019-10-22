var exec = require("exec");

function query(text, callback) {
    'use strict';
    process.stdin.resume();
    process.stdout.write(text);
    process.stdin.once("data", function (data) {
        callback(data.toString().trim());
    });
}

function copyBaseProject(newProjectDir, callback){
	var ncp = require('ncp').ncp;
	ncp.limit = 16;
	ncp(_baseDir+"/baseProject", newProjectDir, function (err) {
		if (err) {
			console.error(err);
			callback(false)
		}
		callback(true);
	});
}

function createNewProject(newProjectDir, callback){
	console.log("\ncreating a new project in directory\n"+newProjectDir);
	fs.mkdirSync(newProjectDir);
	copyBaseProject(newProjectDir, callback);
}

function testFolder(folderName){
	var newProjectDir = _path+"/"+folderName
	if(fs.existsSync(newProjectDir)){
		console.log("\nfolder "+folderName+" already exists\n"+newProjectDir+"\npick a diffrent folder name\n");
		process.exit(1);
	} else {
		createNewProject(newProjectDir, function(){

			exec("cd " + folderName + " && npm install", function() {
				process.exit(1);
			});
			
		});

	}
	
}
//process.exit(1);
//templates

exports.run = function(args) {
	if(args.length == 0){
		query("enter a folder name for the new project : ", function(folderName){
			testFolder(folderName);
		});
	} else {
		testFolder(args[0]);
	}
};
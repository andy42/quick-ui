Spawn = require('child_process').spawn;
Fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;
Decoder = new StringDecoder('utf8');

function validate(validateObject, objectToTest, missingObjectMessage){
	if(objectToTest === null){
		validateObject.vaild = false;
		validateObject.messages.push(missingObjectMessage);
	}
	else if(objectToTest.validate().valid == false){
		validateObject.vaild = false;
		validateObject.messages.concat(objectToTest.validate().messages)
	}
	return validateObject;
}

			

consoleOutput = Fs.createWriteStream('./stdout.log');
consoleErrorOutput = Fs.createWriteStream('./stderr.log');
Console = require('console').Console;


Autocomplete = require("./autocomplete.js").create();
Charm = require('charm')();
PageBase = require("./uiComponents/pageBase.js");
Ui = require("./uiComponents/ui.js");

Data = require("./models/data.js").create();
Data.load();
PageManager = require("./uiComponents/pageManager.js");
PageManager.addPage("rootPage");
PageManager.update();

// Devices.refreshDevices("android",function(){

// });


// const folderPath = '../smoke free app';
// var data = Fs.readFileSync(folderPath+'/app/config.json', 'utf8');
// var file = Decoder.write(data);
// configFile = JSON.parse(file);
// if(!!configFile.global && !!configFile.global.theme){
// 	console.log(configFile.global.theme);
// }

// const folderPath = '../smoke free app';
// //const folderPath = '../MonarchNew';
// var themeFolder = "/app/themes"

// console.log("isDirectory = "+Fs.statSync(folderPath+themeFolder).isDirectory() );
// if(Fs.statSync(folderPath+themeFolder).isDirectory()){
// 	var files = Fs.readdirSync(folderPath+themeFolder);
// 	files.forEach(file => {
// 		if(Fs.lstatSync(folderPath+themeFolder+"/"+file).isDirectory() ){
// 			console.log(file);
// 		}
// 	});
// }
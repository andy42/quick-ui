#! /usr/bin/env node
var userArgs = process.argv.slice(2);
var command = userArgs[0];
fs = require('fs-extra');


global._path = process.cwd();
global._baseDir = __dirname;
global._util = require('./util');

if (fs.existsSync(__dirname + '/commands/' +command+".js")) {
    require(__dirname + '/commands/' + command).run(userArgs.slice(1));
} else {
	console.log("command "+command+" does not exist");
}



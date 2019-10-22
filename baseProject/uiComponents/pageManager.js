
var keypress = require('keypress');
var tty = require('tty');


var pageStack = [];
var currentPage = null;

function clearScreen(){
	for (var i = 0; i < (process.stdout.rows); i++) {
		Charm.position(0, i);
        Charm.erase('end');
    }
}
clearScreen();

function update(){
	currentPage.clearScreen();
	currentPage.update();
}
function focus(){
	currentPage.focus();
}

function charPress(char, key){
	if(!!currentPage && !!currentPage.charPress){
		currentPage.charPress(char, key);
	}
}
function upPress(){
	currentPage.upPress();
}
function downPress(){
	currentPage.downPress();
}



Charm.pipe(process.stdout);
if (typeof process.stdin.setRawMode == 'function') {
    process.stdin.setRawMode(true);
} else {
    tty.setRawMode(true);
}
process.stdin.resume();

keypress(process.stdin);
process.stdin.on('keypress', function onKeypress (ch, key) {
	if (key && key.ctrl && key.name == 'c') {
		clearScreen();
        process.stdin.pause();
        process.exit();
    } 
    else if (key && key.ctrl && key.name == 'v') {
        Util.calculateLineIndex(function(string){
        	charPress(string);
        });
    } 
    else if (key && key.name === 'up') {
        upPress();
        update();
    } else if (key && key.name === 'down') {
        downPress();
        update();
    } else {
    	charPress(ch, key)
		update();
    }
});

process.stdout.on('resize', function() {
	update();
});

getClipboard = function (func) {
  exec('/usr/bin/xclip -o -selection clipboard', function(err, stdout, stderr) {
    if (err || stderr) return func("");
    func(stdout);
  });
};


exports.update = update;

exports.addPage = function(pageName, args){
	var newPage = require("../pages/"+pageName+".js").create(args);
	pageStack.push(newPage);
	currentPage = newPage;
	focus();
}
exports.popPage = function(){
	pageStack.pop();
	currentPage = pageStack[pageStack.length -1];
	focus();
	update();

}
exports.update = update;
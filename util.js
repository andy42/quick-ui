function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.createNewPage= function(pageName){
	if(fs.existsSync(_path+"/pages") == false){
		fs.mkdirSync(_path+"/pages");
	}
	if(fs.existsSync(_path+"/pages/"+pageName+".js") == true){
		return false;
	} else {
		var data = fs.readFileSync(_baseDir+'/templates/newPage.js');
		data = data.toString('ascii', 0, data.length);
		data = data.replace("{*PageName*}", capitalizeFirstLetter(pageName));
		fs.writeFileSync(_path+"/pages/"+pageName+".js", data);
	}
	return true;
}

exports.copyFile =function(source, destination){
	var data = fs.readFileSync(source);
	fs.writeFileSync(destination, data);
}
exports.query = function(text, callback) {
    'use strict';
    process.stdin.resume();
    process.stdout.write(text);
    process.stdin.once("data", function (data) {
        callback(data.toString().trim());
    });
}
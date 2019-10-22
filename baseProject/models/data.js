const folderPath = '../';

class data{
	constructor() {
		var self = this;
	}
	load(){
		if (Fs.existsSync("data.json")) {
			var data = JSON.parse(Fs.readFileSync('data.json', 'utf8'));
		}
	}
	stringify(){
		return JSON.stringify(this, null, 4);
	}
	save(callback){
		Fs.writeFile('data.json', this.stringify(), function(){
			if(!!callback) callback();
	 	});
	}
}

exports.create = function(){
	return new data();
}
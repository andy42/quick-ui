
function createPage(pageName){
	if(_util.createNewPage(pageName) == true){
		console.log("created new page : "+pageName);
	} else {
		console.log("failed to create page : "+pageName);
	}
}

exports.run = function(args) {
	if(args.length == 0){
		_util.query("Enter a name for the new page : ", function(pageName){
			createPage(pageName);
			process.exit(1);
		});
	} else {
		createPage(args[0]);
		process.exit(1);
	}
};
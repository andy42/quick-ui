

exports.create = function(name, args){
	return require("./"+name+".js").create(args);
}
exports.TextType = {
	integer : /^[0-9]*$/g,
	decimal : /^\d*\.?\d*$/g,
	integerAndDash : /^-$|(^[0-9]*$)/g
}
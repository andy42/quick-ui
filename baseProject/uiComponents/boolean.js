class Boolean extends require("./uiBase.js"){
	constructor(args) {
		super(args);
		this.value = false;
		this.selectable = true;
		if(!!args.value) this.value = args.value;
	}
	update(){
		this.drawSelected();
		Charm.position(4, 1 + this.lineIndex);
		this.drawTitle();
		if(this.value === true){
			Charm.display('underscore');
			Charm.write("TRUE");

			Charm.display('reset');
			Charm.write(" : FALSE");


		} else {
			Charm.display('reset');
			Charm.write("TRUE : ");

			Charm.display('underscore');
			Charm.write("FALSE");
		}	
	}
	charPress (char, key){
		if (key && key.name === 'left') {
			this.value = true;
		}
		else if (key && key.name === 'right') {
			this.value = false;
		}		
	}
}

exports.create = function(args){
	return new Boolean(args)
};
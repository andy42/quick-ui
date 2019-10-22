class Button extends require("./uiBase.js"){
	constructor(args) {
		super(args);
		this.value = "";
		this.selectable = true;
		if(!!args.value) this.value = args.value;
	}
	update(){
		this.drawSelected();
		Charm.position(4, 1 + this.lineIndex);
		Charm.display('reset');
		Charm.display('bright');
		if(this.selected === true){
			Charm.display('underscore');
		}
		
		Charm.write(this.value);
	}
	charPress (char, key){
		if (key && key.name === 'return' && !!this.returnCallBack) {
			this.returnCallBack();
		}		
	}
}

exports.create = function(args){
	return new Button(args)
};
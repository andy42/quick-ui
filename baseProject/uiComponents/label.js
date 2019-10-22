
class Label extends require("./uiBase.js"){
	constructor(args) {
		super(args);
		this.value = "";
		this.selectable = false;
		this.underscore = false;
		if(!!args.underscore) this.underscore = args.underscore;
		if(!!args.value) this.value = args.value;
		if(!!args.selectable) this.selectable = args.selectable;
	}
	update(){
		
		this.drawSelected();
		Charm.position(4, 1 + this.lineIndex);
		this.drawTitle();
		
		Charm.display('reset');
		if(this.selected === true && this.underscore == true){
			Charm.display('underscore');
		}
		
		Charm.write(this.value);
	}
	charPress (char, key){

		if (key && key.name === 'return') {
			if(!!this.returnCallBack){
				this.returnCallBack(this);
			}
		}
	}
}

exports.create = function(args){
	return new Label(args)
};
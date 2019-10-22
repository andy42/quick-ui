class VList extends require("./uiBase.js"){
	constructor(args) {
		super(args);
		this.value = "";
		this.selectedIndex =0;
		this.alwaysSelected = false;
		this.array = [];
		if(!!args.value) this.value = args.value;
		if(!!args.array) this.array = args.array;
		if(!!args.alwaysSelected) this.alwaysSelected = args.alwaysSelected;

	}

	update(){
		Charm.position(0, 1 + this.lineIndex);

		this.drawTitle();

		for(var i=0; i < this.array.length; i++){
			
			Charm.display('reset');

			if((this.selected === true || this.alwaysSelected === true) && this.selectedIndex === i ){
				if(this.selectedIndex === i){
					Charm.position(0, 1 + this.lineIndex + i);
					Charm.write("-> ");
				}
				Charm.position(4, 1 + this.lineIndex + i); 
				Charm.display('underscore');
				Charm.write(this.array[i].name);
			} else {
				Charm.position(4, 1 + this.lineIndex + i);
				Charm.write(this.array[i].name);
			}
		}
	}
	//rows[i].lineCount = Math.ceil(StringLength / process.stdout.columns);
	calculateLineIndex(startPosition){
		this.lineIndex = startPosition + this.top;
		this.lineCount = this.array.length;
		return this.lineIndex + this.lineCount+ this.bottom;
	}
	setOnChangeCallBack(callBack){
		this.onChangeCallBack = callBack;
	}
	getSelected(){
		return this.array[this.selectedIndex];
	}
	push(value){
		this.array.push(value);
	}
	setArray(array){
		this.array = array;
		this.selectedIndex = 0;
	}
	charPress (char, key){
		if (key && key.name === 'backspace') {
			
		}
		else if (key && key.name === 'return') {
			if(!!this.returnCallBack){
				this.returnCallBack(this);
			}
		}		
	}
	moveUp(){
		if(this.selectable === false){
			return true;
		}
		if(this.selected === true){
			if(this.selectedIndex ===0){
				return true;
			} else {
				this.selectedIndex--;
				return false;
			}
		} else {
			return false;
		}
	}
	moveDown(){
		if(this.selectable === false){
			return true;
		}
		if(this.selected === true){
			if(this.selectedIndex === this.array.length){
				return true;
			} else {
				this.selectedIndex++;
				return false;
			}
		} else {
			return false;
		}
	}
}

exports.create = function(args){
	return new VList(args)
};
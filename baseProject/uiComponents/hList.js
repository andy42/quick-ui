class HList extends require("./uiBase.js"){
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
		this.drawSelected();
		Charm.position(4, 1 + this.lineIndex);
		this.drawTitle();

		for(var i=0; i < this.array.length; i++){
			Charm.display('reset');

			if((this.selected === true || this.alwaysSelected === true) && this.selectedIndex === i ){
				Charm.display('underscore');
				Charm.write(this.array[i].name);
			} else {
				Charm.write(this.array[i].name);
			}
			Charm.display('reset');
			if(i !== (this.array.length -1)){
				Charm.write(" - ");
			}
		}
	}
	//rows[i].lineCount = Math.ceil(StringLength / process.stdout.columns);
	calculateLineIndex(startPosition){
		this.lineIndex = startPosition + this.top;
		this.lineCount = Math.ceil((this.title.length +this.value.length + this.titleSpacing) / process.stdout.columns);
		return this.lineIndex + this.lineCount+ this.bottom;
	}
	setOnChangeCallBack(callBack){
		this.onChangeCallBack = callBack;
	}
	setSelected(index){
		this.selectedIndex = index
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

		}
		else if (key && key.name === 'left') {
			if(this.selectedIndex > 0){
				this.selectedIndex--;
			}
			if(!!this.onChangeCallBack){
				this.onChangeCallBack(this);
			}
		}
		else if (key && key.name === 'right') {
			if(this.selectedIndex < (this.array.length -1)) {
				this.selectedIndex++;
			}
			if(!!this.onChangeCallBack){
				this.onChangeCallBack(this);
			}
		}		
	}
}

exports.create = function(args){
	return new HList(args)
};
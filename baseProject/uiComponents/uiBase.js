class UiBase{
	constructor(args) {
		
		this.id = "";
		this.lineIndex = 0;
		this.lineCount = 0;
		this.top = 0;
		this.bottom = 0;
		this.value = "";
		this.selected = false;
		this.selectable = true;
		this.returnCallBack = null;
		this.onChangeCallBack = null;
		this.title = "";
		this.titleSpacing = 1;

		if(!!args.id)  this.id = args.id;
		if(!!args.top)  this.top = args.top;
		if(!!args.bottom)  this.bottom = args.bottom;
		if(!!args.selected) this.selected = args.selected;
		if(!!args.selectable) this.selectable = args.selectable;
		if(!!args.returnCallBack) this.returnCallBack = args.returnCallBack;
		if(!!args.onChangeCallBack) this.onChangeCallBack = args.onChangeCallBack;
		if(!!args.title) this.title = args.title;
		if(!!args.titleSpacing) this.titleSpacing = args.titleSpacing;
	}
	update(){

	}
	drawTitle(){
		Charm.display('reset');
		Charm.display('bright');
		Charm.write(this.title);
		Charm.display('reset');
		if(this.title != ""){
			Charm.write(Array(this.titleSpacing + 1).join(" "));
		}
	}
	drawSelected(){
		Charm.position(0, 1 + this.lineIndex);
		Charm.display('reset');
		if(this.selected === true){
			//Charm.display('underscore');
			Charm.write("-> ");
		} else {
			Charm.write("   ");
		}
	}
	updateCursor(){
		
	}
	focus(){
		this.selected = true;
	}
	blur(){
		this.selected = false;
	}
	calculateLineIndex(startPosition){
		this.lineIndex = startPosition + this.top;
		return this.lineIndex + this.bottom + 1;
	}
	charPress (char, key){
	}
	moveUp(){
		if(this.selectable === false){
			return true;
		}
		if(this.selected === true){
			return true;
		} else {
			return false;
		}
	}
	moveDown(){
		if(this.selectable === false){
			return true;
		}
		if(this.selected === true){
			return true;
		} else {
			return false;
		}
	}
	setReturnCallBack(callBack){
		this.returnCallBack = callBack;
	}
	setOnChangeCallBack(callBack){
		this.onChangeCallBack = callBack;
	}
}


module.exports = UiBase;
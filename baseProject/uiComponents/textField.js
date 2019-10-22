class TextField extends require("./uiBase.js"){
	constructor(args) {
		super(args);
		this.value = "";
		this.regex = null;
		this.textType = null;
		this.aliases = {};
		this.autocomplete = require("../autocomplete.js").create();
		this.useAutocomplete = false;
		if(!!args.value) this.value = args.value;
		if(!!args.regex) this.regex = args.regex;
		if(!!args.textType) this.textType = args.textType;
		if(!!args.aliases) this.aliases = args.aliases;
		if(!!args.autocompleteList){
			this.useAutocomplete = true;
			this.autocomplete.init(args.autocompleteList);
		} 
	}

	update(){
		
		this.drawSelected();
		Charm.position(4, 1 + this.lineIndex);
		this.drawTitle();

		Charm.display('reset');
		if(this.title != ""){
			Charm.write(Array(this.titleSpacing + 1).join(" "));
		}

		Charm.write(this.getValue());

		if(this.useAutocomplete === true){

			var value = this.value;
			var result = this.autocomplete.search(value);

			Charm.display('dim');
			Charm.foreground(1)
			Charm.write(result.autoCommplate);
			Charm.display('reset');
		}

	}
	updateCursor(){
		var charCount = this.title.length +this.getValue().length;
		Charm.position(charCount%process.stdout.columns + this.titleSpacing +2 + 3, this.lineIndex + this.lineCount);
		Charm.cursor(true);
	}
	//rows[i].lineCount = Math.ceil(StringLength / process.stdout.columns);
	calculateLineIndex(startPosition){
		this.lineIndex = startPosition + this.top;
		this.lineCount = Math.ceil((this.title.length +this.value.length + this.titleSpacing) / process.stdout.columns);
		return this.lineIndex + this.lineCount+ this.bottom;
	}
	getAutocompleteMatch(){
		var result = this.autocomplete.search(this.value);
		//this.value = JSON.stringify(result);
		if(!!result.match){
			return result.match;
		}
		else {
			return null;
		}
	}
	callOnChangeCallBack(){
		if(!!this.onChangeCallBack){
			this.onChangeCallBack(this);
		}
	}
	getValue(){
		if(this.value in this.aliases){
			return this.aliases[this.value];
		}
		else {
			return this.value;
		}
	}
	charPress (char, key){
		if (key && key.name === 'backspace') {
			this.value = this.value.slice(0, - 1);
			this.callOnChangeCallBack();
		}
		else if (key && key.name == 'tab') {
			if(this.useAutocomplete === true){
				var result = this.autocomplete.search(this.value);
				this.value += result.autoCommplate;
				this.callOnChangeCallBack();
			}
		}
		else if (key && key.name === 'escape') {
			this.value = "";
			this.callOnChangeCallBack();
		}
		else if (key && key.name === 'return') {
			if(!!this.returnCallBack){
				this.returnCallBack(this);
			}
		}
		else if (key && key.name === 'left') {

		}
		else if (key && key.name === 'right') {

		}
		else {
			if(this.useAutocomplete === true){
				var value = this.value;
				var result = this.autocomplete.search(value + char);
				if(result.searchList.length > 0){
					this.value += char;
					this.callOnChangeCallBack();
				}
			}
			else if(this.regex !== null){
				var newString = this.value + char;
				if(newString.match(this.regex)){
					this.value += char;
					this.callOnChangeCallBack();
				}
			}
			else if(this.textType !== null){
				var newString = this.value + char;
				if(newString.match(this.textType)){
					this.value += char;
					this.callOnChangeCallBack();
				}
			}
			else {
				this.value += char;
				this.callOnChangeCallBack();
			}
			
		}		
	}
}

exports.create = function(args){
	return new TextField(args)
};
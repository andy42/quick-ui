class PageBase{
	

	constructor(args) {
		this.rows = [];
		this.rowDictionary = {};
		this.currentRowIndex = 0;
	}

	charPress (char, key){
		this.rows[this.currentRowIndex].charPress(char, key);
	};
	update(){
		this.calculateLineIndex();
		Charm.cursor(false);
		for(var i=0; i< this.rows.length; i++){
			this.rows[i].update();
		}
		this.rows[this.currentRowIndex].updateCursor();
		Charm.display('reset');
	}
	clearScreen(){
		Charm.erase('screen');
		for (var i = 0; i < (process.stdout.rows)*10; i++) {
			Charm.position(0, i);
	        Charm.erase('end');
	    }
	}
	focus(){

	}
	focusRow(index){
		this.currentRowIndex = index;
		for(var i = 0; i< this.rows.length ; i++){
			if(i === index){
				this.rows[i].focus();
			} else {
				this.rows[i].blur();
			}
		}
		
	}

	focus(){
		this.calculateLineIndex();
	}
	calculateLineIndex(){
		var linePosition = 0;
		for(var i=0; i < this.rows.length; i++){
			linePosition = this.rows[i].calculateLineIndex(linePosition);
		}
	}
	blurAll(){
		for(var i = 0; i< this.rows.length ; i++){
			this.rows[i].blur()
		}
	}
	upPress(){
		var newRowIndex = this.currentRowIndex;
		for(var i = this.currentRowIndex; i >= 0; i--){
			if(this.rows[i].moveUp() === false){
				this.currentRowIndex = i;
				this.blurAll();
				this.rows[i].focus()
				break;
			}
		}
	}
	downPress(){
		var newRowIndex = this.currentRowIndex;
		for(var i = this.currentRowIndex; i< (this.rows.length) ; i++){
			if(this.rows[i].moveDown() === false){
				this.currentRowIndex = i;
				this.blurAll();
				this.rows[i].focus();
				break;
			}
		}
	}
	rowLookUp(id){
		return this.rowDictionary[id];
	}
	addRow(rowType, args){
		var newRow = Ui.create(rowType, args);
		this.rows.push(newRow);
		if(!!args.id){
			this.rowDictionary[args.id] = newRow;
		}
		return newRow;
	}
}

module.exports = PageBase;
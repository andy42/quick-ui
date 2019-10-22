class Page extends PageBase{
	constructor(args) {
		super();
		var self = this;

		this.addRow("label", {value : "--{*PageName*}--"});
		this.addRow("button", {value : "BACK", top : 1, returnCallBack : PageManager.popPage });
		
		this.focusRow(1);
	}
	focus(){
		this.focusRow(1);
	}
}

exports.create = function(args){
	return new Page(args);
}
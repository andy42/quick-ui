class RootPage extends PageBase{
	constructor(args) {
		super();
		var self = this;

		this.addRow("label", {value : "--Root Page--"});

		this.textLabel = this.addRow("label", {value : "no data", top : 1});

		this.addRow("button", {value : "Button 1", top : 1, returnCallBack : function(){
			self.textLabel.value = "button 1 pressed"
			//PageManager.addPage("newPage");
		}});
		this.addRow("button", {value : "Button 2", top : 0, returnCallBack : function(){
			self.textLabel.value = "button 2 pressed"
		}});

		
		this.focusRow(2);
	}
	focus(){
		this.focusRow(2);
	}
}

exports.create = function(args){
	return new RootPage(args);
}
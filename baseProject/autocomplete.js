function subStringMatch(string, subString){
	//console.log("subString.length = "+subString.length+", string.length = "+string.length);
	if(subString.length <= string.length){
		for(var i=0; i<subString.length;i++){
			if(subString[i].toLowerCase() != string[i].toLowerCase()){
				return false;

			}
		}
		return true;
	} else {
		return false;
	}
}

function Node(index){
	var self = this;
	this.index = index;
	this.nodeCount = 0;
	this.charMap = {};
	this.charArray = [];

	this.add = function(newObject){
		if(self.index === newObject.name.length){
			self.charMap["\n"] = newObject;
			self.charArray.push(chr);
			self.nodeCount++;
		} else {
			var chr = newObject.name[self.index].toLowerCase();
			if(chr in self.charMap){
				if(!!self.charMap[chr].name){
					var newNode = new Node(self.index +1);
					newNode.add(self.charMap[chr]);
					newNode.add(newObject);
					self.charMap[chr] = newNode;
				} else {
					self.charMap[chr].add(newObject);
				}
			} else {
				self.charMap[chr] = newObject;
				self.charArray.push(chr);
				self.nodeCount++;
			}
		}
	}
	this.getBaseNode = function(value){
		var chr = "";
		if(self.index == value.length){
			return self;
		} 
		else {
			chr = value[self.index].toLowerCase();
		}
		if(chr in self.charMap){
			if(!!self.charMap[chr].getBaseNode){
				return self.charMap[chr].getBaseNode(value);
			} else {
				return self;
			}
		} else {
			return self;
		}
	}
	this.getAutoCommplateString = function(value, string){

		if(self.index < value.length){
			var chr = value[self.index].toLowerCase();
			if(!!self.charMap[chr] && self.charMap[chr].name){
				return self.charMap[chr].name.slice(value.length, self.charMap[chr].name.length);
			} else {
				return "";
			}
			
		}
		else if(self.nodeCount === 1){
			var chr = self.charArray[0];
			if(!self.charMap[chr].name){
				return self.charMap[chr].getAutoCommplateString(value, string + chr);
			} else {
				return self.charMap[chr].name.slice(value.length, self.charMap[chr].name.length);
			}
		} else {
			return string;
		}
	}
	this.getMatch = function(value){
		if(self.index < value.length){
			var chr = value[self.index].toLowerCase();
			return self.charMap[chr];
		} 
		else if(self.nodeCount === 1){
			var chr = self.charArray[0];
			if(!!self.charMap[chr].name){
				return self.charMap[chr];
			}
		}
		else if(!!self.charMap["\n"]){
			return self.charMap["\n"];
		} else {
			return null;
		}
	}
	this.getPossibleMatches = function(value){
		var array = [];
		for(var chr in self.charMap){
			if(!!self.charMap[chr].name){
				//console.log("brake name = "+self.charMap[chr].name+", value = "+value);
				if(subStringMatch(self.charMap[chr].name, value) ){
					array.push(self.charMap[chr]);
				}
				
			} else {
				array = array.concat(self.charMap[chr].getPossibleMatches(value));
			}
		}

		return array;
	}
}



function Autocomplete(){
	var self = this;
	this.rootNode = new Node(0);

	this.init = function(array){
		for(var i=0; i< array.length; i++){
			self.rootNode.add(array[i]);
		}
	}

	this.search = function(value){
		//return self.rootNode.search(value);
		var returnValue = {};
		var baseNode = self.rootNode.getBaseNode(value);
		// if(baseNode.nodeCount == 1){
		// 	var chr = baseNode.charArray[0];
		// 	if(!!baseNode.charMap[chr].name){

		// 		if(subStringMatch(baseNode.charMap[chr].name, value) ){
		// 			returnValue.match = baseNode.charMap[chr];
		// 		}
		// 	}
		// } 
		// else if(baseNode.nodeCount > 1 && !!baseNode.charMap["\n"]){
		// 	returnValue.match = baseNode.charMap["\n"]
		// }
		returnValue.match = baseNode.getMatch(value)
		returnValue.autoCommplate = baseNode.getAutoCommplateString(value, "");
		//returnValue.autoCommplate = JSON.stringify(baseNode);

		returnValue.searchList = baseNode.getPossibleMatches(value);
		returnValue.baseNode = baseNode;
		return returnValue;
	}
}

exports.create = function(){
	return new Autocomplete();
}
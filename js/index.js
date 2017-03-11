//view
var calculator = {
	total: "",
	entry: "0",
	operation: "0",
	justClearedOperator: false,
	justClearedNumber: false,
	maxEntryChars: 11,

	allClear: function(){
		this.entry = this.operation = "0";
		this.total = "";
		this.justClearedOperator = this.justClearedNumber = false;
	},
	clearEntry: function(){
		if(this.operation.split(" ").length == 1){
			this.allClear();
		}else{
			this.entry = "0";
			var entryArr = this.operation.split(" ");
			var removedEntry = entryArr.splice(-1);
			this.operation = entryArr.join(" ");
			if ( /\*|\/|-$|\+/.test(removedEntry)){
				this.justClearedOperator = true;
				this.justClearedNumber = false;
			}
			else{
				this.justClearedNumber = true;
				this.justClearedOperator = false;
			}
		}
	},
	updateEntry: function(val){
		var justCalculated =  /\=|Error/.test(this.operation);

		function isOperator(value){
			var operators = /\*|\/|-$|\+/;
			return operators.test(value);	
		}
	
		if (isOperator(val) && !this.justClearedNumber){
			if (justCalculated){
				this.entry = val;
				this.operation = this.total + " " + val;

			}else if (!isOperator(this.entry)){
				//Remove trailing decimal values 
				this.removeTraililngDecimals();
				this.entry = val;
				this.operation +=  " " + val;
				this.justClearedOperator = false;
			}else if(isOperator(this.entry)){
				//Replace operator
				this.entry = val;
				this.operation = this.operation.replace(/.$/,val);
			}	
		
		}else if (typeof val == 'number' && !this.justClearedOperator){
			if (justCalculated){
				this.allClear();
			}
			if (this.entry.length < this.maxEntryChars){
				//do not allow leading 0s
				if(this.entry == "0"){
					this.entry = "";
					if (!this.justClearedNumber){
						this.operation = this.operation.replace(/.$/,"");
					}
					else{
						this.operation += " ";
					}	
				}
				if (isOperator(this.entry)){
					this.entry = val.toString();
					this.operation += " " + this.entry;

				}else{ //concatenating numbers
					this.entry += val.toString();
					this.operation += val.toString();
				}
				this.justClearedNumber = false;
			}	
		}else if(val == '.' && !this.justClearedOperator){
			if (justCalculated){
				this.allClear();
			}
			if (this.entry.length < this.maxEntryChars){
			var contains_decimal = /\./.test(this.entry);
			if (!contains_decimal){
				if (isOperator(this.entry) || this.justClearedNumber){
				this.entry = "0";
				this.operation += " " + this.entry;
				
				}
				this.entry += val;
				this.operation += val;
			}
			}	
		}else if(val=="=" && !justCalculated){
			this.justClearedOperator = this.justClearedNumber = false;

			var lastEntry = this.operation.split(" ").splice(-1);
			if (!isOperator(lastEntry)){

				this.removeTraililngDecimals();
				this.total = math.eval(this.operation);
				this.entry = this.total;
				this.operation += " = " + this.total;

			}else{
				this.entry = this.operation = "Error";
				this.total = "0";
			}
		}else if(val=="%" && !isOperator(this.entry) && this.entry != "Error"){
			if (justCalculated){
				this.total = math.eval(this.total + "/100");
				this.operation = this.entry +  "%" + " = " + this.total; 
			}else{
				var partial_total = math.eval(this.entry + "/100");
				var trimmed = this.operation.split(" ");
				trimmed.splice(-1);
				trimmed = trimmed.join(" ");
				this.total = math.eval(trimmed + partial_total);
				this.operation += "%" + " = " + this.total; 
			}
			this.entry = this.total;
		}else if (val == "allClear"){
			this.allClear();
		}else if (val == "clearEntry"){
			if (!justCalculated){
				this.clearEntry();
			}
			else{
				this.allClear();
			}
		}
	},
	removeTraililngDecimals: function(){
		if (this.entry.slice(-1) == "."){
			this.entry = this.entry.replace(/\./, "");
			this.operation = this.operation.replace(/.$/,"");
		}
	}
};

var controller = {
	addEntry: function(val){
		calculator.updateEntry(val);
		if (!/\*|\/|-$|\+/.test(calculator.entry)){
				view.displayEntry(calculator.entry);
		}
		view.displayOperation(calculator.operation);
	}
};

var view = {
	addEventListeners: function(){
		var btnEntry = {
			"btn_0": 0,
			"btn_1": 1,
			"btn_2": 2,
			"btn_3": 3,
			"btn_4": 4,
			"btn_5": 5,
			"btn_6": 6,
			"btn_7": 7,
			"btn_8": 8,
			"btn_9": 9,
			"btn_dec": ".",
			"btn_add": "+",
		 	"btn_subtract": "-",
		 	"btn_multiply": "*",
		 	"btn_divide": "/",
		 	"btn_percent": "%",
		 	"btn_equals": "=",
		 	"btn_allClear": "allClear",
		 	"btn_clearEntry": "clearEntry"
		};
		
		for (var id in btnEntry){
			document.getElementById(id).addEventListener("click", function(){
				controller.addEntry(btnEntry[this.id]);
		 	});
		}
	},
	displayEntry: function(val){
		var entry = document.getElementById("entry");
		if (val.toString().length > 11){
			entry.className = "x-small-font";
		}
		else{
			entry.classList.remove("x-small-font");
		}
		//entry.classsName = "large-font"
		entry.innerHTML =  val;
	},
	displayOperation: function(val){
		var operation = document.getElementById("operation");
		/*if (val.toString().length >28){
			//get the last 35 characters of the string and then concatenate << to the front of the string.
			console.log(val);
			val = "<<" + val.toString().slice(-28);
		}*/
		//when overflow is detected, add "<<" 
		if (operation.scrollHeight > operation.offsetHeight){
			val = "overflow has occured";
		}
		operation.innerHTML = val;
	}
};

view.addEventListeners();

$(function(){
		$('.ripple').materialripple();
});
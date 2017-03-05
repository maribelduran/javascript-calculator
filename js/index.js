//Day 61: Tuesday 

//Fix max digit input in EntryScreen
//Add shortcut keys
//Create tests https://forum.freecodecamp.com/t/javascript-calculator-project-with-testable-user-stories-guinea-pigs-needed/58941

//view
var calculator = {
	total: "",
	currentEntry: "0",
	currentOperation: "0",
	justClearedOperator: false,
	justClearedNumber: false,

	allClear: function(){
		this.currentEntry = this.currentOperation = "0";
		this.total = "";
		this.justClearedOperator = this.justClearedNumber = false;
	},
	clearEntry: function(){
		if(this.currentOperation.split(" ").length == 1){
			this.allClear();
		}else{
			this.currentEntry = "0";
			var entryArr = this.currentOperation.split(" ");
			var removedEntry = entryArr.splice(-1);
			this.currentOperation = entryArr.join(" ");
			if ( /\*|\/|-|\+/.test(removedEntry)){
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
		var justCalculated =  /\=|Error/.test(this.currentOperation);

		function isOperator(value){
			var operators = /\*|\/|-|\+/;
			return operators.test(value);	
		}
	
		if (isOperator(val) && !this.justClearedNumber){
			if (justCalculated){
				this.currentEntry = val;
				this.currentOperation = this.total + " " + val;

			}else if (!isOperator(this.currentEntry)){
				//Remove trailing decimal values 
				this.removeTraililngDecimals();
				this.currentEntry = val;
				this.currentOperation +=  " " + val;
				this.justClearedOperator = false;
			}else if(isOperator(this.currentEntry)){
				//Replace operator
				this.currentEntry = val;
				this.currentOperation = this.currentOperation.replace(/.$/,val);
			}	
		
		}else if (typeof val == 'number' && !this.justClearedOperator){
			if (justCalculated){
				this.allClear();
			}
			//do not allow leading 0s
			if(this.currentEntry == "0"){
				this.currentEntry = "";
				if (!this.justClearedNumber){
					this.currentOperation = this.currentOperation.replace(/.$/,"");
				}
				else{
					this.currentOperation += " ";
				}	
			}
			if (isOperator(this.currentEntry)){
				this.currentEntry = val.toString();
				this.currentOperation += " " + this.currentEntry;

			}else{ //concatenating numbers
				this.currentEntry += val.toString();
				this.currentOperation += val.toString();
			}
			this.justClearedNumber = false;
		
		}else if(val == '.' && !this.justClearedOperator){
			if (justCalculated){
				this.allClear();
			}

			var contains_decimal = /\./.test(this.currentEntry);
			if (!contains_decimal){
				if (isOperator(this.currentEntry) || this.justClearedNumber){
				this.currentEntry = "0";
				this.currentOperation += " " + this.currentEntry;
				
				}
				this.currentEntry += val;
				this.currentOperation += val;
			}	
		
		}else if(val=="=" && !justCalculated){
			this.justClearedOperator = this.justClearedNumber = false;

			var lastEntry = this.currentOperation.split(" ").splice(-1);
			if (!isOperator(lastEntry)){

				this.removeTraililngDecimals();
				this.total = math.eval(this.currentOperation);
				this.currentEntry = this.total;
				this.currentOperation += " = " + this.total;

			}else{
				this.currentEntry = this.currentOperation = "Error";
				this.total = "0";
			}
		
		}else if(val=="%"){
			if (justCalculated){
				this.total = math.eval(this.total + "/100");
				this.currentOperation = this.currentEntry +  "%" + " = " + this.total; 
			}else{
				var partial_total = math.eval(this.currentEntry + "/100");
				var trimmed = this.currentOperation.split(" ");
				trimmed.splice(-1);
				trimmed = trimmed.join(" ");
				this.total = math.eval(trimmed + partial_total);
				this.currentOperation += "%" + " = " + this.total; 
			}
			this.currentEntry = this.total;
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
		if (this.currentEntry.slice(-1) == "."){
			this.currentEntry = this.currentEntry.replace(/\./, "");
			this.currentOperation = this.currentOperation.replace(/.$/,"");
		}
	}
};

var controller = {
	addEntry: function(val){
		calculator.updateEntry(val);
		if (!/\*|\/|-|\+/.test(calculator.currentEntry)){
				view.displayEntry(calculator.currentEntry);
		}
		view.displayOperation(calculator.currentOperation);
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
		var entry = document.getElementById("entryField");
		entry.innerHTML = val;
	},
	displayOperation: function(val){
		var operation = document.getElementById("operation");
		operation.innerHTML = val;
	}
};

view.addEventListeners();

$(function(){
		$('.ripple').materialripple();
});
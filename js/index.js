//Day 46: Friday 2/16
//Continued working on JS Calculator view layer.

//view
var calculator = {
	total: '',
	currentEntry: "0",
	currentOperation: "",
	justClearedOperator: false,
	justClearedNumber: false,

	allClear: function(){
		this.currentEntry = "0";
		this.currentOperation = "";
		this.total = '';
		this.justClearedOperator = this.justClearedNumber = false;
	},
	clearEntry: function(){
		if(this.currentOperation.length == 1){
			this.allClear();
		}else{
			this.currentEntry = "0";
			var entryArr = this.currentOperation.split(" ");
			var removedEntry = entryArr.splice(entryArr.length-1);
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
	updateCurrEntry: function(val){
		var justCalculated =  /\=|Error/.test(this.currentOperation);

		function isOperator(value){
			var operators = /\*|\/|-|\+/;
			return operators.test(value);	
		}
		if (isOperator(val)){
			if (justCalculated){
				this.currentEntry = val;
				this.currentOperation = this.total + " " + val;
				justCalculated = false; 

			}else if (isOperator(this.currentEntry) == false && this.justClearedNumber!= true) {
				if (this.currentEntry[this.currentEntry.length-1] == "."){
					//remove trailing decimal values 
					this.currentEntry = this.currentEntry.replace(/\./, "");
					this.currentOperation = this.currentOperation.replace(/.$/,"");
				}
				//if we have just cleared the current Entry
				this.currentEntry = val;
				this.currentOperation = this.currentOperation + " " + val;
				//this.updateCurrentOperation();
				this.justClearedOperation = false;
			}else if(isOperator(this.currentEntry)){
				//replace operator
				this.currentEntry = val;
				//this.updateCurrentOperation();
				this.currentOperation = this.currentOperation.replace(/.$/,val);
			}
			
		}else if (typeof val == 'number' && !this.justClearedOperator){
			//might be able to use allClear() instead
			if (justCalculated){
				this.allClear();
			}
			//need to fix this
			//this causes issues when we clear out a number and then want to add a number again
			//also causes issues where we click on 0 twice. it will clear out everything
			//we don't want to concatenate "0".
			if(this.currentEntry == "0"){
				this.currentEntry = "";
				if (!this.justClearedNumber){
					this.currentOperation = this.currentOperation.replace(/.$/,"");
				//this.currentOperation += "";
				}
				else{
					this.currentOperation += " ";
				}	
			}
			if (isOperator(this.currentEntry)){
				//this.previousEntry.push(this.currentEntry);
				this.currentEntry = val.toString();
				this.currentOperation += " " + this.currentEntry;
				//this.updateCurrentOperation();

			}else{ //concatenating numbers
				var valToString = this.currentEntry.toString() + val.toString();
				this.currentEntry = valToString;
				//this.updateCurrentOperation();
				this.currentOperation = this.currentOperation + val.toString();
			}
			this.justClearedNumber = false;

		}else if(val == '.'){
			if (justCalculated){
				this.currentEntry = this.currentOperation = "0";
			}

			var contains_decimal = /\./.test(this.currentEntry);
			if (!contains_decimal && this.justClearedOperator!= true){
				if (isOperator(this.currentEntry) || this.justClearedNumber){
				this.currentEntry = "0";
				this.currentOperation += " " + this.currentEntry;
				
				}
				var valToString = this.currentEntry.toString() + val.toString();
				this.currentEntry = valToString;
				this.currentOperation = this.currentOperation + val.toString();
			}	
		}else if(val == "=" && !justCalculated){
			if (!isOperator(this.currentOperation.split(" ").splice(-1))){
				this.total = math.eval(this.currentOperation);
				this.currentEntry = this.total;
				this.currentOperation += " = " + this.total;

			}else{
				this.currentEntry = this.currentOperation = "Error";
				this.total = "";
			}
		}
		else if (val == "allClear"){
			this.allClear();
		}
		else if (val == "clearEntry"){
			if (!justCalculated){
				this.clearEntry();
			}
			else{
				this.allClear();
			}
		}
	},
	//Figure out a better way to update the currentOperation
	updateCurrentOperation: function(){
		this.currentOperation = "";
		this.previousEntry.forEach(function(entry){
			this.currentOperation += entry;
			this.currentOperation += " ";
		},this);
		this.currentOperation += this.currentEntry;
	},
	getTotal: function(values){
		//call operation based on the operation string and return total.
		return this.add(parseFloat(values[0]), parseFloat(values[2]));
	}
}

var controller = {
	//should i separate and create an updateOperator. updateNumber, getTotal, clearEntry.
	//and allClear methods that correspond to new calculator methods.
	updateEntry: function(val){
		calculator.updateCurrEntry(val);
		view.displayEntry(calculator.currentEntry);
		//view.displayOperation(calculator.previousEntry + calculator.currentEntry);
		view.displayOperation(calculator.currentOperation);
	}
};

var view = {
	addEventListeners: function(){
		 var btn_0 = document.getElementById("btn_0");
		 var btn_1 = document.getElementById("btn_1");
		 var btn_2 = document.getElementById("btn_2");
		 var btn_3 = document.getElementById("btn_3");
		 var btn_4 = document.getElementById("btn_4");
		 var btn_5 = document.getElementById("btn_5");
		 var btn_6 = document.getElementById("btn_6");
		 var btn_7 = document.getElementById("btn_7");
		 var btn_8 = document.getElementById("btn_8");
		 var btn_9 = document.getElementById("btn_9");
		 var btn_dec = document.getElementById("btn_dec");
		 var btn_add = document.getElementById("btn_add");
		 var btn_subtract = document.getElementById("btn_subtract");
		 var btn_multiply = document.getElementById("btn_multiply");
		 var btn_divide = document.getElementById("btn_divide");
		 var btn_allClear = document.getElementById("btn_allClear");
		 var btn_clearEntry = document.getElementById("btn_clearEntry");
		 var btn_equals = document.getElementById("btn_equals");

		 btn_0.addEventListener("click", function(){
		 	controller.updateEntry(0);
		 });
		 btn_1.addEventListener("click", function(){
		 	controller.updateEntry(1);
		 });
		 btn_2.addEventListener("click", function(){
		 	controller.updateEntry(2);
		 });
		 btn_3.addEventListener("click", function(){
		 	controller.updateEntry(3);
		 });
		 btn_4.addEventListener("click", function(){
		 	controller.updateEntry(4);
		 });
		 btn_5.addEventListener("click", function(){
		 	controller.updateEntry(5);
		 });
		 btn_6.addEventListener("click", function(){
		 	controller.updateEntry(6);
		 });
		 btn_7.addEventListener("click", function(){
		 	controller.updateEntry(7);
		 });
		 btn_8.addEventListener("click", function(){
		 	controller.updateEntry(8);
		 });
		 btn_9.addEventListener("click", function(){
		 	controller.updateEntry(9);
		 });
		 btn_dec.addEventListener("click", function(){
		 	controller.updateEntry(".");
		 });
		 btn_add.addEventListener("click", function(){
		 	controller.updateEntry("+");
		 });
		 btn_subtract.addEventListener("click", function(){
		 	controller.updateEntry("-");
		 });
		 btn_multiply.addEventListener("click", function(){
		 	controller.updateEntry("*");
		 });
		  btn_divide.addEventListener("click", function(){
		 	controller.updateEntry("/");
		 });
		 btn_allClear.addEventListener("click", function(){
		 	controller.updateEntry("allClear");
		 });
		 btn_clearEntry.addEventListener("click", function(){
		 	controller.updateEntry("clearEntry");
		 });
		 btn_equals.addEventListener("click", function(){
		 	controller.updateEntry("=");
		 });
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
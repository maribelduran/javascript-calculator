//Still have 2 hours to catch up from last week.
//7:15PM
//Day 43& 44: Calculator is about 80% functional! Need to fix minor errors.


//7:15PM - 
//Day 45:
//Able to recover after Error button.
//
//To fix:
//How to recover after an "Error" output




//view
var calculator = {
	total: '',
	previousEntry: [],
	currentEntry: "0",
	currentOperation: "0",
	justClearedOperator: false,
	justClearedNumber: false,

	allClear: function(){
		this.currentEntry = "0";
		this.currentOperation = "0"
		this.total = '';

		this.previousEntry.splice(0, this.previousEntry.length);
	},
	clearEntry: function(){
		if(this.previousEntry.length == 0){
			if ( /\*|\/|-|\+/.test(this.currentEntry)){
				this.justClearedOprator = true;
				this.justClearedNumber = false;
			}
			else{
				this.justClearedNumber = true;
				this.justClearedOprator = false;
				console.log("just cleared a number entry")
			}
			this.currentEntry = this.currentOperation = "0";

		}else{
			var mostRecentE = this.currentOperation[this.currentOperation.length-1];
			console.log("Entry being removed ", mostRecentE);
			if ( /\*|\/|-|\+/.test(this.currentEntry)){
				this.justClearedOprator = true;
				this.justClearedNumber = false;
					console.log("just cleared an operator entry")
			}

			else{
				this.justClearedNumber = true;
				this.justClearedOprator = false;
				console.log("just cleared a number entry")
			}
			this.currentEntry = "0";
			var entryArr = this.currentOperation.split(" ");
			console.log(entryArr);
			entryArr.splice(entryArr.length-1);
			this.currentOperation = entryArr.join(" ");
		}
	},
	updateCurrEntry: function(val){
		var operators = /\*|\/|-|\+/;
		var mostRecentEntry = this.previousEntry[this.previousEntry.length-1];
		var justCalculated =  /\=|Error/.test(this.currentOperation);

		function isOperator(value){
			var operators = /\*|\/|-|\+/;
			return operators.test(value);	
		}

		if (isOperator(val)){

			if (justCalculated){
				this.currentEntry = val;
				//this.currentOperation = this.total + val;
				this.previousEntry.splice(0, this.previousEntry.length);
				this.previousEntry.push(this.total);
				this.updateCurrentOperation();
				justCalculated = false;
				console.log(justCalculated);

			}else if (isOperator(this.currentEntry) == false && this.justClearedNumber!= true) {
				if (this.currentEntry[this.currentEntry.length-1] == "."){
					//remove trailing decimal values 
					this.currentEntry = this.currentEntry.replace(/\./, "");
				}
				//if we haven't just cleared the current Entry
				if (this.justClearedOperator == true){
					this.justClearedOperator = false;
				}
				else{
					this.previousEntry.push(this.currentEntry);	
				}
				this.currentEntry = val;
				this.updateCurrentOperation();
			}
			else if(isOperator(this.currentEntry)){
				//replace operator
				this.currentEntry = val;
				this.updateCurrentOperation();
			}	
			console.log("end of code block");
			
		}else if (typeof val == 'number'){
			this.justClearedNumber = false;
			//might be able to use allClear() instead
			if (this.currentEntry == "0" || (this.total!= "" && justCalculated) || this.currentEntry == "Error"){
				this.currentEntry = this.total = "";
				this.currentOperation = "";
				this.previousEntry.splice(0, this.previousEntry.length)
			}
			
			if (isOperator(this.currentEntry)){
				this.previousEntry.push(this.currentEntry);
				this.currentEntry = val.toString();
				this.updateCurrentOperation();

			}else if ((/\d/.test(mostRecentEntry) == true) && this.previousEntry.length > 0){
				this.currentEntry = "0";
			}else{ //concatenating numbers
				var valToString = this.currentEntry.toString() + val.toString();
				this.currentEntry = valToString;
				this.updateCurrentOperation();
				
			}
		}else if(val == '.'){
			//check that decimal character is not in the currentEntry input value
			//there can only be one decimal in the currenEntry

			if (justCalculated){
				//Want to clear out currentOperation, currentEntry, and previousEntry
			}

			var contains_decimal = /\./.test(this.currentEntry);
			if (!contains_decimal && this.justClearedOperator!= true){
				if (isOperator(this.currentEntry)){
				this.previousEntry.push(this.currentEntry);
				this.currentEntry = "0";
				this.updateCurrentOperation();
				justCalculated = false;
			}
				var valToString = this.currentEntry.toString() + val.toString();
				this.currentEntry = valToString;
				this.updateCurrentOperation();
			}	
		}else if(val == "=" && !justCalculated){
			if (this.previousEntry.length == 0){
				//this.currentEntry = math.eval(this.currentOperation);
				this.total = this.currentEntry;
				this.currentOperation = this.currentEntry + "=" + this.currentEntry;

			//if end of expression does not end with an operator.
			}else if (!isOperator(this.currentOperation[this.currentOperation.length-1])){
				this.total = math.eval(this.currentOperation);
				this.currentEntry = this.total;
				this.currentOperation += " = " + this.total;

			}else{
				this.currentEntry = "Error";
				this.currentOperation = "Error";
				this.total = "0";
			}

		}
		else if (val == "allClear"){
			this.allClear();
		}
		else if (val == "clearEntry"){
			if (!justCalculated){
				console.log("Just clearing entry");
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
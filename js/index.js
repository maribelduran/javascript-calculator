//Fixed
//2/3/2017
//Fixed not being able to switch operators. Before when one operator was entered, I couldn't change to a different operator.

//2/4/2017
//calculator now accepts "0." as a valid entry. This fixed the issue where the calc could not switch operators after inserting "0.".
//a number value ending with "." will convert to an integer when added to the current operation string. For example, "3.0" will transform into "3";

//2/5/2016 (Day 34)
//Calculator does not allow digit or decimal inputs after an operator value was just cleared using Clear (clear button).

//2/6/2016: (Day 35:Coded for 40 min, Need to finish 20 and update)
//Calculator now accepts an operator entry afer an operator was just cleared. 

//2/7/2017 (day 36):
//Didn't code
//DIdn't get to code. Woke up at 4 am to try to catch the Haleakala Sunrise in Hawaii and didn't stop the whole day.

//2/8/2017 (day 37):
//Accepts "." convert sto "0.".
//Currently fixing bug: //Should not allow opeator input after an number was cleared using Clear (clear button).
//Continued working on Calculator JS App. Nothing too exiciting.  

//02/09/2017 (Day 38):
//Calculator does not allow operator inputs after an number entry was just cleared.

//Things to fix when validating inputs
//Currently not being able to add "0" after a number entry has just been cleared.
//Does not allow to clear a "0" entry.

//view
var calculator = {
	total: 0,
	previousEntry: [],
	currentEntry: "0",
	currentOperation: "0",
	justClearedOperator: false,
	justClearedNumber: false,
	add: function(num1, num2){
		var sum = num1 + num2;
		return sum;
	},
	subtract: function(num1, num2){
		var diff = num1 - num2;
		return diff;
	},
	multiply: function(num1, num2){
		var multiplied = num1 * num2;
		return multiplied;
	},
	divide: function(num1, num2){
		var divided = num1/num2;
		return divided;
	},
	allClear: function(){
		this.currentEntry = "0";
		this.currentOperation = "0"

		this.previousEntry.splice(0, this.previousEntry.length);
	},
	clearEntry: function(){
		if(this.previousEntry.length == 0){
			if ( /\*|\/|-|\+/.test(this.currentEntry)){
				this.justClearedOprator = true;
			}
			else{
				this.justClearedNumber = true;
				console.log("just cleared a number entry")
			}
			this.currentEntry = this.currentOperation = "0";

		}else if (this.currentEntry !== "0"){
			if ( /\*|\/|-|\+/.test(this.currentEntry)){
				this.justClearedOperator = true;
			}

			else{
				this.justClearedNumber = true;
				console.log("just cleared a number entry")
			}
			this.currentEntry = "0";
			var entryArr = this.currentOperation.split(" ");
			entryArr.splice(entryArr.length-1);
			this.currentOperation = entryArr.join(" ");
			console.log(this.currentOperation);
			console.log(this.previousEntry);
		}
	},
	updateCurrEntry: function(val){
		var operators = /\*|\/|-|\+/;
		var mostRecentEntry = this.previousEntry[this.previousEntry.length-1];
		console.log("MostRecentEntry: " + mostRecentEntry);
		console.log("CurrentEntry is: " + this.currentEntry);

		function isOperator(value){
			var operators = /\*|\/|-|\+/;
			return operators.test(value);	
		}

		if (isOperator(val)){
			if (isOperator(this.currentEntry) == false && this.justClearedNumber!= true) {
				//check if currentEntry has a .
				//if the currentEntry contains a decimal at the end of the string, then we want to remove (trim) the decimal value 
				//try using a regex expression to check whether the currentEntry string has a decimal at the end.
				///.(0)/.test(this.currentEntry);
				if (this.currentEntry[this.currentEntry.length-1] == "."){
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
				this.currentEntry = val;
				this.updateCurrentOperation();
			}	
			
		}else if (typeof val == 'number' && val !==0){
			if (this.currentEntry == "0"){
				this.currentEntry = "";
			}

			if (this.justClearedNumber == true){
					this.justClearedNumber = false;
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
		}
		else if(val == 0){
			if (this.justClearedNumber == true){
					this.justClearedNumber = false;
			}


			if (this.currentEntry != "0"){
				if (isOperator(this.currentEntry)){
					this.previousEntry.push(this.currentEntry);
					this.currentEntry = "";
				}
				var valToString = this.currentEntry.toString() + val.toString();
				this.currentEntry = valToString;
				this.updateCurrentOperation();
			}
		}
		else if(val == '.'){
			//check that decimal character is not in the currentEntry input value
			//there can only be one decimal in the currenEntry
			var contains_decimal = /\./.test(this.currentEntry);

			if (!contains_decimal && this.justClearedOperator!= true){
				if (isOperator(this.currentEntry)){
				this.previousEntry.push(this.currentEntry);
				this.currentEntry = "0";
				this.updateCurrentOperation();
			}
				var valToString = this.currentEntry.toString() + val.toString();
				this.currentEntry = valToString;
				this.updateCurrentOperation();
			}	
		}
			
		else if(val == "="){
			//do something
		}
		else if (val =="+/-"){
			//do something
		}
		else if (val == "allClear"){
			this.allClear();
		}
		//check wen 
		else if (val == "clearEntry"){
			this.clearEntry();
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

/*
console.log(calculator.add(1.677777,2.677777));
console.log(calculator.multiply(3.2,2.5));
console.log(calculator.divide(0,2.5));
console.log(calculator.subtract(0,2.5));
console.log(calculator.allClear());
console.log(calculator.cancelEntry());
*/
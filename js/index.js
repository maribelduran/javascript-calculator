//view

//things to fix for input values:
//3. should convert into 3.0 when adding to the currentOperation string.
//
//
var calculator = {
	total: 0,
	previousEntry: [],
	currentEntry: "0",
	currentOperation: "0",
	add: function(num1, num2){
		var sum = num1 + num2;
		return sum;
	},
	subtract: function(num1, num2){
		//watch out for 
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
		this.previousEntry.splice(0, this.previousEntry.length);
		this.currentOperation = "0"
	},
	clearEntry: function(){
		if (this.currentEntry !== "0"){
			this.currentEntry = "0";
			var entryArr = this.currentOperation.split(" ");
			entryArr.splice(entryArr.length-1);
			console.log("new operation is:" + entryArr);
			this.currentOperation = entryArr.join(" ");
		}
		if(this.currentEntry == "0" && this.previousEntry.length == 0){
			this.currentEntry = "0";
			this.currentOperation = "0";
		}
		//var newOperation = this.currentOperation.slice(0,this.currentOperation.length-2);
		//console.log("new operation is:" + newOperation);
		

		//return this.currentEntry;
	},
	updateCurrEntry: function(val){

		if (val == "+"){
			console.log("currentEntry is: " + this.currentEntry);
			if ((this.currentEntry!= "0" && this.currentEntry!= "0.") && (this.currentEntry!=val && this.currentEntry!="-" && this.currentEntry!="*" && this.currentEntry!="/"))  {
				this.previousEntry.push(this.currentEntry);
				this.currentEntry = val;
				this.updateCurrentOperation();
			}
			
		}
		if (val == "-"){
			if ((this.currentEntry!= "0" && this.currentEntry!= "0.") && (this.currentEntry!=val && this.currentEntry!="+" && this.currentEntry!="*" && this.currentEntry!="/"))  {
				this.previousEntry.push(this.currentEntry);
				this.currentEntry = val;
				this.updateCurrentOperation();
			}
			
		}
		else if(val == "*"){
			if ((this.currentEntry!= "0" && this.currentEntry!= "0.") && (this.currentEntry!=val && this.currentEntry!="+" && this.currentEntry!="-" && this.currentEntry!="/"))  {
				this.previousEntry.push(this.currentEntry);
				this.currentEntry = val;
				this.updateCurrentOperation();
			}

		}else if (val == "/"){
			if ((this.currentEntry!= "0" && this.currentEntry!= "0.") && (this.currentEntry!=val && this.currentEntry!="+" && this.currentEntry!="-" && this.currentEntry!="*"))  {
				this.previousEntry.push(this.currentEntry);
				this.currentEntry = val;
				this.updateCurrentOperation();
			}

		}else if (typeof val == 'number' && val !==0){
			if (this.currentEntry == "0"){
				this.currentEntry = "";
			}
			if (this.currentEntry == "+" || this.currentEntry == "-" || this.currentEntry == "*" || this.currentEntry == "/"){
				this.previousEntry.push(this.currentEntry);
				this.currentEntry = val.toString();
				this.updateCurrentOperation();
			}else{
				var valToString = this.currentEntry.toString() + val.toString();
				this.currentEntry = valToString;
				this.updateCurrentOperation();
			}

		}
		else if(val == 0){
			if (this.currentEntry != "0"){
				if (this.currentEntry == "+" || this.currentEntry == "-" || this.currentEntry == "*" || this.currentEntry == "/"){
					this.previousEntry.push(this.currentEntry);
					this.currentEntry = "";
					//this.updateCurrentOperation();
				}
				var valToString = this.currentEntry.toString() + val.toString();
				//console.log("valToString is: " + valToString);
				//this.currentEntry = parseInt(valToString);
				this.currentEntry = valToString;
				this.updateCurrentOperation();
			}
			
			//check that previousEntry is not empty or that we
		}
		//0. should not be a valid input
		else if(val == '.'){
			//check that decimal character is not in the currentEntry input value
			//there can only be one decimal in the currenEntry
			var contains_decimal = /\./.test(this.currentEntry);

			if (!contains_decimal){
				if (this.currentEntry == "+" || this.currentEntry == "-" || this.currentEntry == "*" || this.currentEntry == "/"){
				this.previousEntry.push(this.currentEntry);
				this.currentEntry = "0";
				this.updateCurrentOperation();
			}
				var valToString = this.currentEntry.toString() + val.toString();
				console.log("valToString is: " + valToString);
				//if I parseFloat the string value, it will not provide 0. in the input field. So want to keep it as a string for now.
				//this.currentEntry = parseFloat(valToString);
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
			console.log(entry);
			this.currentOperation += entry;
			this.currentOperation += " ";

		},this);
		this.currentOperation += this.currentEntry;
		console.log("CurrentOperation is: " + this.currentOperation);
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
		console.log(val);
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





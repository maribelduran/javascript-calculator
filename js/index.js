//view
var calculator = {
	total: 0,
	previousEntry: [],
	currentEntry: "0",
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
		this.total = 0;
		return this.total;
	},
	cancelEntry: function(){
		this.currentEntry = 0;
		return this.currentEntry;
	},
	updateCurrEntry: function(val){

		if (val == "+"){
			if (this.curentEntry !== "+" || this.currentEntry !== "0"){
				this.previousEntry.push(this.currenEntry);
				this.currentEntry = "+";
				return 1;
			}
			else{
				return 0;
			}
		}else if (typeof val == 'number' && val !==0){
			if (this.previousEntry.length == 0){
				this.currentEntry = "";
			}
			var valToString = this.currentEntry.toString() + val.toString();
			console.log("valToString is: " + valToString);
			this.currentEntry = parseInt(valToString);
			this.previousEntry.pop();
			this.previousEntry.push(this.currentEntry);

		}
		else if(val == 0){
			if (this.previousEntry.length != 0){
				var valToString = this.currentEntry.toString() + val.toString();
				console.log("valToString is: " + valToString);
				this.currentEntry = parseInt(valToString);
				this.previousEntry.pop();
				this.previousEntry.push(this.currentEntry);
			}
			//check that previousEntry is not empty or that we
		}
		else if(val == '.'){
			//there can only be one decimal in the currenEntry
		}
		else if(val == "-"){
			//check that previousEntry is not empty
			//check that previousEntry is not another operator
		}
		else if(val == "*"){
			//do something
		}	
		else if (val == "/"){
			//do something
		}
		else if(val == "="){
			//do something
		}
		else if (val =="+/-"){
			//do something
		}
		else if (val == "allClear"){
			this.currentEntry = "0";
			this.previousEntry.splice(0,this.previousEntry.length);
		}
		console.log("previousEntry is: " + this.previousEntry[0]);
	}
};

var controller = {
	updateEntry: function(val){
		
		console.log("Attempting to add " + val + " to current input value.");
		calculator.updateCurrEntry(val);
		view.displayEntry(calculator.currentEntry);
		view.displayOperation(calculator.previousEntry);
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
		 var btn_decimal = document.getElementById("btn_decimal");
		 var btn_allClear = document.getElementById("btn_allClear");

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
		 btn_add.addEventListener("click", function(){
		 	controller.updateEntry("+");
		 });
		 btn_allClear.addEventListener("click", function(){
		 	controller.updateEntry("allClear");
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





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
	updateCurrEntry: function(num){
		if (this.previousEntry.length == 0){
			this.currentEntry = "";
		}
		this.currentEntry += num.toString();	
		this.previousEntry.push(num.toString()); 
	}
};

var controller = {
	updateEntry: function(num){
		console.log("adding " + num + " to current input value.");
		calculator.updateCurrEntry(num);
		view.displayEntry(calculator.currentEntry);
	}
};

var view = {
	addEventListeners: function(){
		// var 0 = document.getElementById("0");
		 var btn_1 = document.getElementById("btn_1");
		 var btn_2 = document.getElementById("btn_2");
		 var btn_3 = document.getElementById("btn_3");
		 var btn_4 = document.getElementById("btn_4");
		 var btn_5 = document.getElementById("btn_5");
		 var btn_6 = document.getElementById("btn_6");
		 var btn_7 = document.getElementById("btn_7");
		 var btn_8 = document.getElementById("btn_8");
		 var btn_9 = document.getElementById("btn_9");

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

	},
	displayEntry: function(val){
		var entry = document.getElementById("entryField");
		entry.innerHTML = val;
		this.displayOperation;
	},
	displayOperation: function(val){

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





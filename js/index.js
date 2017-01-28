//view
var calculator = {
	total: 0,
	previousEntries: "",
	currentEntry: 0,
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
	}
};

var view = {
	addEventListeners: function(){
		 var 0 = document.getElementById("0");
		 var 1 = document.getElementById("1");
		 var 2 = document.getElementById("2");

		 1.addEventListener("click", function(){
		 	
		 });

	}


};

/*
console.log(calculator.add(1.677777,2.677777));
console.log(calculator.multiply(3.2,2.5));
console.log(calculator.divide(0,2.5));
console.log(calculator.subtract(0,2.5));
console.log(calculator.allClear());
console.log(calculator.cancelEntry());
*/





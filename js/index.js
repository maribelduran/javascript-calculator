//view
var calculator = {
	total: 0,
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
		this.total = 0;
	},
	cancelEntry: function(){
		//clear current entry
	}
};

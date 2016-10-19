//Given an array A[] and a number x, check for pair in A[] with sum as x
var App = {};
App.List = function(){
	this.list = [];
	this.inserted = [];
	this.length = 10;

	this.match = 55;
	return this;
};
App.List.prototype.start = function(){
	var that = this;
	for(var i = 0; i < this.length; ++i){
		var tmp = Math.floor(Math.random() * (this.length + 90)) + 1;
		if(i === 0){
			that.list.push(tmp);
			that.inserted.push(tmp);
		} else {
			while(that.inserted.indexOf(tmp) !== -1){
				tmp = Math.floor(Math.random() * (this.length + 90)) + 1;
			}
			that.list.push(tmp);
			that.inserted.push(tmp);
		}
	}
	that.sort();
};
App.List.prototype.sanityCheck = function(){
	var that = this;
	that.list = [1, 4, 45, 6, 10, -8];
	that.sort();
	that.match = 16;
};
App.List.prototype.sort = function(){
	this.list.sort(function(a, b){
		return a - b;
	});
};

App.List.prototype.dump = function(){
	console.log(this.list);
};
var cb = function(error, data){
	if(error) {
		console.log('none matches: ' + data);
		return;
	}
	console.log(data);
};

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
// merge sort or heap sort (-)(nlogn) (worst case)
// quick sort O(n^2) worst case
// auxiliary space [merge_sort: O(n), heap_sort: O(1)]
/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
App.List.prototype.useSort = function(callback){
	var that = this;
	var list = that.list;
	var index = 0;
	var end = that.list.length - 1;

	while(index < end){
		var addVal = list[index] + list[end];
		if(addVal === that.match){
			callback(null, {
				'first': list[index],
				'last': list[end],
				'total': addVal
			});
			return;
		}
		else if(addVal > that.match){
			end--;
		} else if(addVal < that.match){
			index++;
		}
	}
	callback(true, that.match);
	return;
};
App.List.prototype.useHashMap = function(callback){
	var that = this;
	var hash = {}
	that.list.map(function(value, index){
		// this is important: 
		// since we are checking the sum to see if it matches that.match, we use hash to sort values that we looked through. 
		// if sum-new_array_value [exists]->[=] on hash, then we return the substracted value(temp) and the current value in interation
		var temp = that.match - value; 
		if(temp >= 0 && hash[temp] == 1){
			callback(null, {
				'first': temp,
				'last': value,
				'total': that.match
			})
			return;
		} else {
			hash[value] = 1;
		}
	});
	callback(true, that.match);
	return;
};

// to run:
// var mine = new App.List();
// mine.start();
// mine.sanityCheck();
// mine.dump();
// mine.useSort(cb);
// mine.useHashMap(cb);
(function(){
	console.log('hello');
})();

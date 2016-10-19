// self-invoking anonymous function
// NOTE: *Elements* returns array
// 		 *Element* returns single
(function(){
	/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
	// BASICS

	//get element by id and tag name
	var x = document.getElementById('test-1');
	var y = [];
	y[0] = x.getElementsByTagName('p');
	y[1] = x.getElementsByTagName('h1');
	console.log(y);

	//get elements by class name
	var x1 = document.getElementsByClassName('container')[0];
	var y2 = [];
	y2[0] = x1.getElementsByTagName('p')[0];
	console.log(y2);


	//finding html elements by css selectors
	var x2 = document.querySelectorAll('h1#test-3');
	console.log(x2);

	var x3 = document.forms['frml'];
	for(var i = 0; i < x3.length; ++i){
		console.log(x3[i].value);
	}

	/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */


	document.write(Date());
})()

function mouseDown (obj){
	obj.style.backgroundColor = '#1ec5e5';
	obj.innerHTML = 'BOOM!';
}
function mouseUp (obj){
	obj.style.backgroundColor = '#D94A38';
	obj.innerHTML = 'POW!';
}
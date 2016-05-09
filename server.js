var express = require('express');
var path = require('path');
var https = require('https');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

https = https.createServer(app).listen(8000, function(){
	console.log("LISTEN: 8000");
});
$.ajax({
	url:"https://en.wikipedia.org/wiki/Most_common_words_in_English", 
	type: 'GET',
	success: function(result){
		
	}
});
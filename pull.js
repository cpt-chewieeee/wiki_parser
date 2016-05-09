var http = require("https");
var fs = require('fs');

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

download('https://en.wikipedia.org/wiki/Programming_language', function(data){
	fs.writeFile('public/parse_page.html', data, function(err){
		if(err) throw err;
	});

});
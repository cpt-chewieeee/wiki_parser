var App = {};

App.WikiConverter = function(){
	this.body = null;
	this.commonOxford = null;
	return this;
};
App.WikiConverter.init = function(){
	var that = this;
	$.ajax('https://en.wikipedia.org/wiki/Most_common_words_in_English')
	.done(function(data){
		var html_data = $('<html />').append(data);
		that.parseCommonWords(html_data);
		that.parseBody($('body').html());
		// that.build();
	})
	.fail(function(err){
		console.log('Ajax Error', err);
	});
};

App.WikiConverter.parseCommonWords = function(data){
	var that = this;
	var html_data = data.find('table.wikitable').find('tr td:nth-child(2)');
	that.commonOxford = [];
	if(html_data.length !== 100) return;
	html_data.each(function(index, value){
		that.commonOxford.push($(value).text());
	});
	var commonWords = ['are', 'is', 'where', 'was'];
	that.commonOxford = that.commonOxford.concat(commonWords);
};
App.WikiConverter.parseBody = function(data){
	var that = this;
	var parsed = data;
	var all_strings = '';
	$('div').each(function(){
		var tmp = $(this).children('div').text().replace(/\s\s+/g, ' ').split('\n');
		for(var i = 0; i < tmp.length; i++){
			if(tmp[i][0] !== undefined){
				if(tmp[i][0].match(/[a-z]/i)){// get rid of newline that starts with }
					var tmp2 = tmp[i].split(' ');
					if((tmp2[0] !== 'var' && tmp2[0] !== 'function' && tmp2[0] !== 'if') && tmp2[0].indexOf('\.') === -1){//checks for javascript
						// console.log(tmp[i]);
						var values = that.filter(tmp[i]);
						// console.log(values);
						for(var i = 0; i < values.length; ++i){
							all_strings += values[i];
						}
						
					}
				}
			}
		}

	});
	console.log(all_strings);
};
App.WikiConverter.check = function(){
	console.log(this.body);
};
App.WikiConverter.filter = function(data){
	var ret = data;

	ret = ret.replace(/(\b(\w{1,1})\b(\W|$))/g, '');//replace single lettter
	ret = ret.replace(/[0-9]/g, '');//replace numbers
	ret = ret.replace(/[^\w\s\-]/g, '');
	return ret.toLowerCase().split(' ');
};
App.WikiConverter.build = function(){

	var hash = {};
	var counts = [];
	var that = this;
	var words = that.body;
	var common = that.commonOxford;

	words.each(function(index, value){
		hash[words[index]] = (hash[words[index]]) ? hash[words[index]]++ : 1;
	});
	common.each(function(index, value){
		if(hash[common[index]]) delete hash[common[index]];
	});
};
App.WikiConverter.init();
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
		that.parseBody($('body').html);
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
	var parsed = data;

	// parsed = parsed.replace(/[^\s\w]/ig, '');//replace symbols
	// parsed = parsed.replace(/[0-9]/g, '');//replace numbers
	// parsed = parsed.replace(/\s\s+/g, ' ');//replace white+
	// parsed = parsed.replace(/(\b(\w{1,1})\b(\W|$))/g, '');//replace one letter words
	// parsed = parsed.replace(/\w{15}/g, '');
	// this.body = parsed.toLowerCase().split(' ');


	console.log(parsed);
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
/**
 *
 * Created By: Hongyi Zhang
 * Date: May 9th, 2016
 * Email: hzhan016@gmail.com
 * Github: https://github.com/cpt-chewieeee/
 *
*/

var App = {};

/**
 * constructor 
*/
App.WikiConverter = function(){
	this.body = null;
	this.commonOxford = null;
	return this;
};

/** 
 * ajax promise
*/
App.WikiConverter.init = function(){
	var that = this;
	$.ajax('https://en.wikipedia.org/wiki/Most_common_words_in_English')
	.done(function(data){
		var html_data = $('<html></html>').append(data);
		that.parseCommonWords(html_data);//parse and store in this.commonOxford
		that.parseBody($('body').html());
		var top = that.build();

		that.renderHTML(top);
	})
	.fail(function(err){
		console.log('Ajax Error', err);
	});
};

/**
 * parse 100 most common words to array
*/
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

/**
 * parse the body of the document
*/
App.WikiConverter.parseBody = function(data){
	var that = this;
	var parsed = data;
	parsed = that.filterSS(parsed); //filter out <script></script> and <style></style>
	parsed = that.filterWords(parsed); //filter symbols, numbers, etc.
	that.body = parsed;
};
/**
 * body text filter helper #1: <script></script> and <style></style>
*/
App.WikiConverter.filterSS = function(data){//filter out script and style codes within data
	var ret = data;
	
	ret = ret.replace(/\s\s+/g, ' ');//removing whitespace+
	ret = ret.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');//removing all script tags
	ret = ret.replace(/<style\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/style>/gi, '');//removing all style tags
	ret = $.parseHTML(ret);
	ret = $(ret).text();
	return ret;
};

/*
 * body text filter helper #2: symbols, numbers, whitespace
*/
App.WikiConverter.filterWords = function(data){
	var ret = data;
	
	ret = ret.replace(/[^\w\s\-]/g, ' ');//replace symbols except -
	ret = ret.replace(/[0-9]/g, ' ');//replace numbers
	
	ret = ret.replace(/\-\-+/g, ' ');//replace --*
	ret = ret.replace(/\-[^\w]/g, ' ');//replace -\s
	ret = ret.replace(/(\b(\w{1,1})\b(\W|$))/g, ' ');//replace single char

	ret = ret.replace(/\n/g, '');//replace newline
	ret = ret.replace(/\w{20}/gi, ' ');//replace words thats longer than 20 chars
	ret = ret.replace(/\s\s+/g, ' ');//replace whitespace

	return ret.toLowerCase();
};

/**
 * check to see if str is in the this.commonOxford array
*/
App.WikiConverter.compare = function(str){
	var that = this;
	return (that.commonOxford.indexOf(str));
};

/**
 * get 25 top most occurred words
*/
App.WikiConverter.getTop = function(dataHash){
	var ret = [];
	var sort_freq = Object.keys(dataHash);
	sort_freq.sort(function(a, b){
		return dataHash[b] - dataHash[a];
	});
	for(var i = 0; i < 24; ++i){
		ret.push(sort_freq[i]);
	}
	return ret;
};

/**
 * hashMap the amount of occurrance in this.body
 * return hashMap with top 25 most occurrance 
*/
App.WikiConverter.build = function(){
	var hash = {};
	var counts = [];
	var that = this;
	var words = that.body.split(' ');
	var common = that.commonOxford;
	words.forEach(function(value, index){
		if(that.compare(value) < 0){
			hash[value] = (hash[value]) ? hash[value]+1 : 1;
		}
	});
	counts = that.getTop(hash);
	return {
		counts: counts,
		map: hash
	};
};

/**
 * render the body: find the top 25 words in $(body) and replace it with the words in top 25 frequency
*/
App.WikiConverter.renderHTML = function(obj){
	var that = this;
	var freq = obj.counts;
	var hash = obj.map;
	var body = $('body').html();
	freq.forEach(function(value, index){
		body = body.replace ( new RegExp(value, 'gi'), hash[value]);
	});
	$('body').empty().append(body);
};


App.WikiConverter.init();//start
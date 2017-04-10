console.log('The message bot is starting');

var Twit = require('twit');

var config = require('./config/config.js');
var T = new Twit(config);

var stream = T.stream('statuses/filter', {
	track: ['@je_bent_zelf']
});
stream.on('tweet', tweetEvent);

function tweetEvent(tweet) {
	var username = "@" + tweet.user.screen_name;
	var reply;

	var count = (temp.match(/@je_bent_zelf/g) || []).length;
	if (count == 1) {
		reply = username + ' Je bent zelf een' + tweet.text.replace("@je_bent_zelf", "") + '!'
	} else if (count > 1) {
		reply = username + ' Je bent zelf een poging tot een oneindige loop!'
	} else {
		reply = username + ' @DVYBTTR heeft me nog niet goed genoeg geprogrammeerd :('
	}

	var nameID = tweet.id_str;

	var params = {
		status: reply,
		in_reply_to_status_id: nameID
	};

	T.post('statuses/update', params, function(err, data, response) {
		if (err !== undefined) {
			console.log(err);
		} else {
			console.log('Tweeted: ' + params.status);
		}
	})
};
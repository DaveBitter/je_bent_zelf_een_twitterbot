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

	var nameID = tweet.id_str;
	var reply = username + ' Je bent zelf een' + tweet.text.replace("@je_bent_zelf", "") + '!'

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
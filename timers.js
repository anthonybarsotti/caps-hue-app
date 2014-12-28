var http = require('http');
var _ = require('underscore');
var hue = require('./hue.js');
var currentScore = 0;

exports.hour = function(gameHour, gameMinute, gameID) {
	function checkHour(h) {
		var now = new Date();
		if (h <= now.getHours()) {
			// Initiate minute check to see if current minute is 
			console.log('Almost there bb');
			checkMinute(gameHour + ':' + gameMinute, gameID);
		}
		else {
			setTimeout(checkHour, 3600000);
		}
	}
	checkHour(gameHour);
}

function checkMinute(m, id) {
	var now = new Date();
	if (m <= now.getHours() + ':' + now.getMinutes()) {
		checkScore(id);
		console.log('Game time bb');
	}
	else {
		setTimeout(checkMinute, 60000);
	}
}

function checkScore(id) {
	var options = {
		host: 'api.onetwosee.com',
		path: '/nhl/update/' + id + '/rogers?normalize=true'
	};
	var req = http.get(options, function(res) {
		var bodyChunks = [];
		res.on('data', function(chunk) {
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			var gameInfo = JSON.parse(body.toString());
			var gameStatus = gameInfo.game.status;
			var capsScore = _.findWhere(gameInfo.boxscores, {teamId: 15});
			var today = new Date();
			if (gameStatus === 'post-event') {
				console.log('Game is over bb');
			}
			else {
				// If game is still going and caps score a goal, update current score and trigger lights
				if (capsScore.score > currentScore) {
					currentScore = capsScore.score;
					hue.triggerLights();
				}
				setTimeout(checkScore(), 5000);
			}
		})
	});

	req.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});
}
var http = require('http');
var _ = require('underscore');
var options = {
  host: 'api.thescore.com',
  path: '/nhl/teams/15/events/full_schedule'
};

var req = http.get(options, function(res) {
  var bodyChunks = [];
  res.on('data', function(chunk) {
    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    var fullSchedule = JSON.parse(body.toString());
    // Get the next game in the Caps schedule
    var nextGame = _.findWhere(fullSchedule, {event_status: 'pre_game'});
    getNextGame(nextGame.api_uri);
  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});

function getNextGame(uri) {
	var options = {
		host: 'api.thescore.com',
		path: uri
	};
	var req = http.get(options, function(res) {
		var bodyChunks = [];
		res.on('data', function(chunk) {
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			var game = JSON.parse(body.toString());
			var url = game.sportsnet_tracker_url;
			// Get ID of event on SportsNet
			getSNData(url.substr(url.lastIndexOf('/') + 1));
		})
	});

	req.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});
}

function getSNData(id) {
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
			var startTime = new Date(gameInfo.game.startTime);
			// Get game's date
			var startDate = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate();
			var today = new Date();
			var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			if (today == startDate) {
				// Start checking by minute to see if game has started
			}
			else {
				console.log('No game today bb');
			}
		})
	});

	req.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});
}
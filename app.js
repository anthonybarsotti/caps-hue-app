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
    var nextGame = _.findWhere(fullSchedule, {event_status: 'pre_game'});
    console.log(nextGame.api_uri);
  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});
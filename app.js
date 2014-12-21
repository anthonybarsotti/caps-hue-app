var http = require('http');
var options = {
  host: 'api.thescore.com',
  path: '/nhl/teams/15/events/full_schedule'
};

var req = http.get(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));

  var bodyChunks = [];
  res.on('data', function(chunk) {
    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    console.log('BODY: ' + body);
  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});
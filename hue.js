var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var lightState = hue.lightState;

var displayResult = function(result) {
	console.log(result);
};

var displayError = function(err) {
	console.error(err);
};

//Add host and username
var host = "XXX",
username = "XXX",
api = new HueApi(host, username),
state1 = lightState.create();
state2 = lightState.create();

api.setLightState(1, state1.alert(true).on())
.then(displayResult)
.fail(displayError)
.done();
api.setLightState(2, state2.alert(true).on())
.then(displayResult)
.fail(displayError)
.done();
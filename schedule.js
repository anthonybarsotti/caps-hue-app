var app = require('./app.js');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.hour = 0;

var j = schedule.scheduleJob(rule, function(){
    app.findGame();
});
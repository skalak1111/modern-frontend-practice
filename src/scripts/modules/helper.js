var countdown = require('countdown'); //installed additional package
var model = require('./model.js');

var helper = module.exports = {
    dateDiff: function() {
        return countdown(model.currentDate, model.eventDate); //using the installed package.
    }
}; 
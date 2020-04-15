var countdown = require('countdown'); //installed additional package
var model = require('./model.js');

var helper = module.exports = {
    dateDiff: function() {
        return countdown(model.currentDate, model.eventDate); //using the installed package.
    },

    setCurrent: function(id) { 
        for(var i = 0; i < model.menu.length; i++) {
            if(model.menu[i].id === id) {
                model.menuItem = model.menu[i];
                //console.log(model.menuItem);
            }
        }
    },

    getCurrent: function() {
        return model.menuItem;
    },

    increment: function() {
        model.menuItem.count++;
    },
}; 
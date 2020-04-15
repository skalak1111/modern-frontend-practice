var helper = require('./helper.js');

var view = module.exports = {
    init: function() {
        view.showCountdown();
        view.registerClick(); 
    },

    registerClick: function() {
        var id;
        var listItem = document.querySelectorAll('#menu li');

        for(var i = 0; i < listItem.length; i++) {
            listItem[i].addEventListener('click', function(){
                id = this.getAttribute("data-id");
                 //console.log("krishna"+ id); 
                // set the current menu item
                helper.setCurrent(+id); 
                // increment that menu item
                helper.increment();
                // update the menu item in the view
                view.updateCount();
            });
        }
    },

    updateCount: function() {
        //get the current menu item
        var item = helper.getCurrent();
        //find the li of the current menu item
        var li = document.querySelector('[data-id="'+ item.id + '"]')
        var count = li.querySelector('.menu-count');

        //update the count in the view 
        count.innerHTML = item.count;
    },

    showCountdown: function() {
        var diff = helper.dateDiff(); 

        document.querySelector('#years').innerHTML = diff.years;
        document.querySelector('#months').innerHTML = diff.months;
        document.querySelector('#days').innerHTML = diff.days;
    }
};
var assert = require('assert');
var helper = require('../src/scripts/modules/helper.js')
var model = require('../src/scripts/modules/model.js')

model.menuItem = {
    'title': 'Veggie Burger',
    'count': 250,
    'id': 2
};

model.menu = [
    {
        'title': 'Veggie Burger',
        'count': 250,
        'id': 2
    },
    {
        'title': 'Chicken Burger',
        'count': 300,
        'id': 5
    }

]

describe('Helper Tests', function() {
    describe('increment', function() {
        it('should increment the menu item', function() {
            helper.increment();
            assert.equal(model.menuItem.count, 251);
        });
    });

    describe('setCurrent', function() {
        it('should set the current menu item', function() {
            helper.setCurrent(5);
            assert.equal(model.menuItem.id, 5);
        });
    });

    describe('getCurrent', function() {
        it('should return the current menu item', function() {
            helper.setCurrent(2);
            helper.getCurrent();
            assert.equal(model.menuItem.id, 2);
            helper.setCurrent(5);
            helper.getCurrent();
            assert.equal(model.menuItem.id, 5);
        });
    });

})
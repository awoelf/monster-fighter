const { main } = require('@popperjs/core');
const sequelize = require('../config/connection');
const {Card, Deck, User} = require('../models');


sequelize.sync({force: false}).then(() => {
    test();
});

function test() {

}
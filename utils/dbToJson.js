const {Card} = require('../models');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
const fs = require('fs');

sequelize.sync({force: false}).then(() => {
    main();
})

async function main() {
    const cards = await Card.findAll();
    if(cards.length > 0)
    {
        var data = JSON.stringify(cards);
        fs.appendFile('./seeds/cards.json', data, (err) => {
            if(err) throw err;
        })
    }
}
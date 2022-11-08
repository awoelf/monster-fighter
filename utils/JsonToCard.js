const { Card } = require('../models');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
const cards = require('../seeds/cards.json');

sequelize.sync({force: false}).then(() => {
    main();
})

async function main() {
    for (const monster of cards) {
        const card = await Card.findOne({
            where: {
                name: monster.name
            }
        });
        if(card === null) {
            await Card.create(monster);
        }
    }
}
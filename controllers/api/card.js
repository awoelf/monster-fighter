const card = require('express').Router();
const Card = require('../../models/Card');

card.get('/:id', (req, res) => {
    Card.findAll({
        where: {
            id: req.params.id,
        }
    })
    .then((cardData) => {
        res.json(cardData);
    })
})


card.get('/', (req, res) => {
    Card.findAll()
    .then((allCards) => res.json(allCards))
})

module.exports = card;
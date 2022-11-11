const deck = require('express').Router();
const sequelize = require('../../config/connection');
const Deck = require('../../models/Deck');

// const userID = 2;

deck.get('/', (req, res) => {
    Deck.findAll()
    .then((deckData) => {
        res.json(deckData);
    })
})

deck.post('/add', async (req, res) => {
    const {cards, name} = req.body;
    const deckExists = await Deck.findOne({
        where: {
            deck_name: name,
            user_id: req.session.user_id
        }
    });
    if(deckExists) {
        console.log("Deck name already exists. Please change the deck name.");
    } else {
        console.log(cards);
        for(const card of cards) {
            {
               await Deck.create(
                   {
                       deck_name: name,
                       card_id: card,
                       user_id: req.session.user_id
                   }
               );
           }
       }
    }
})

deck.delete('/delete', async (req, res) => {
    const {name} = req.body;
    console.log(name);
    const response = await Deck.destroy({
        where: {
            user_id: req.session.user_id,
            deck_name: `${name}`
        }
    });
    if(response) {
        res.status(200).json({message: `Successfully deleted ${name}`});
    } else {
        res.status(400).json({message: `There was an issue deleting ${name}`});
    }
})


module.exports = deck;
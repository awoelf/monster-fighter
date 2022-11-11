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

deck.post('/add', (req, res) => {
    const { cards, deckName } = req.body;
    if(Deck.findOne({
        where: {
            deck_name: deckName,
            user_id: req.session.user_id
        }
    })) {
        console.log("Deck name already exists. Please change the deck name.");
    } else {
        for(const card of cards) {
            {
               Deck.create(
                   {
                       deck_name: deckName,
                       card_id: card.card.id,
                       user_id: req.session.user_id
                   }
               )
               .then((res) => res.json);
           }
       }
    }
})

deck.delete('/delete', (req, res) => {
    const {deckName} = req.body;
    Deck.destroy({
        where: {
            user_id: req.session.user_id,
            deck_name: deckName
        }
    })
    .then((res) => res.json);
    console.log(`Deleted ${deckName}`);
})


module.exports = deck;
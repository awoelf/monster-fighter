const sequelize = require('../config/connection');
const {Card, Deck, User} = require('../models');

//should convert these functions to routes/event listeners

//this should be retrieved from the db on login
const userID = 2;

//testing the functions here
sequelize.sync({force: false}).then(async () => {
     buildDeck();
    //  const decks = await getDecks(2);
    //  console.log(decks);
    //  viewDeck(1, "meow2");
    //  deleteDeck(1, "meow2");
});

//function for drawing 40 cards when a player creates a deck, use this on landing page, create cards from this
async function draw40() {
    const cards = await sequelize.query("SELECT * FROM card ORDER BY RAND() LIMIT 40", {
        model: Card,
        mapToModel: true
    });
    cardSelection = cards.map((val, index) => {
        return {card: val.dataValues, selected: false};
    });
    return cardSelection;
}

//this will be the function for the event listener when you save a deck
async function saveAsDeck(cards, deckName)
{
    if(await Deck.findOne({
        where: {
            deck_name: deckName,
            user_id: userID
        }
    })) {
        console.log("Deck name already exists. Please change the deck name.");
        return;
    } 
    for(const card of cards) {
         {
            await Deck.create(
                {
                    deck_name: deckName,
                    card_id: card.card.id,
                    user_id: userID
                }
            );
        }
    }
}

//instead of using this function, event listeners attached to the cards will add cards to a global variable of selected cards they will set selected to true and saveAsDeck 
async function pick20(cardPool) {
    var selected = 0;
    var pickedCards = [];
    while(selected < 20) {
        let card = cardPool[Math.floor(Math.random() * cardPool.length)];
        if(!card.selected) {
            card.selected = true;
            selected++;
        }
    }
    for(const card of cardPool)
    {
        if(card.selected) {
            pickedCards.push(card);
        }
    }
    return pickedCards;
} 

async function getDecks(userID) {
    const deckList = [];
    const userDecks = await Deck.findAll({
        where: {
            user_id: userID
        },
        group: 'deck_name'
    });
    for(const deck of userDecks) {
        deckList.push(deck.dataValues.deck_name);
    }
    var deckObjs = await deckList.map((deckName) => {
        return {deckName};
    })
    return deckObjs;
}

//extract cards from a deck; should be used when selecting a deck to view it
async function viewDeck(userID, deckName) {
    const joins = await Card.findAll({
        include: {
            model: Deck,
            where: {
                deck_name: deckName,
                user_id: userID
            }
        }
    });
    const cards = joins.map((val) => {
        delete val.dataValues.decks;
        return val.dataValues;
    })
    return cards;
}

async function deleteDeck(userID, deckName) {
    const res = await Deck.destroy({
        where: {
            user_id: userID, //req.session.user_id
            deck_name: deckName
        }
    });
    console.log(`Deleted ${deckName}`);
    return res;
}



//function which contains backend logic for deck creation (will not be used when linking with front end)
async function buildDeck() {
    const cardPool = await draw40();
    const cards = await pick20(cardPool);
    const result = await saveAsDeck(cards, "meow2");
}

module.exports = {saveAsDeck, deleteDeck}
const e = require('express');
const {Deck, User, Card} = require('../models');
const router = require('express').Router();
// Route for the homepage
router.get('/', async (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
    } else {
        res.render('homepage');
    }
})

router.get('/dashboard', async (req, res) => {
    if(req.session.logged_in) {
        try{
            const deckList = [];
            const userDecks = await Deck.findAll({
                where: {
                    user_id: req.session.user_id
                },
                group: 'deck_name'
            });
            for (const deck of userDecks) {
                deckList.push(deck.dataValues.deck_name);
            }
            var decks = await deckList.map((deckName) => {
                return {deckName};
            })
            var deckRender = {decks: decks};
            res.render('dashboard', deckRender);
        } catch (e) {
            alert(e);
            res.render('dashboard');
        }
    } else {
        res.redirect('/');
    }
    
})

router.get('/player', async (req, res) => {
    if(req.session.logged_in) {
        try {
            const userDecks = await Deck.findAll({
                where: {
                    user_id: req.session.user_id
                },
                group: 'deck_name'
            });
            const deckSize = userDecks.length;
            const name = req.session.user;
            const decks = [];
            for(const deck of userDecks) {
                const joins = await Card.findAll({
                    include: {
                        model: Deck,
                        where: {
                            deck_name: deck.dataValues.deck_name,
                            user_id: req.session.user_id
                        }
                    },
                    //TODO: remove limit when able to render a whole deck in players page
                    limit: 5
                });
                const cards = await joins.map((val) => {
                    delete val.dataValues.decks;
                    return val.dataValues;
                });
                decks.push({deckName: deck.dataValues.deck_name, deck: JSON.stringify(cards)});
            }
            const renderObj = {name: name, deckSize: deckSize, decks: decks};
            console.log(renderObj);
            res.render('player', renderObj);
        } catch (e) {
            alert(e);
            res.render('player');
        }
        
    } else {
        res.redirect('/');
    }
})

router.get('/monsters', async (req, res) => {
    if(req.session.logged_in) {
        let idList = [];
        let cardList = [];
        Card.findAll()
        .then((allCards) => {
            allCards.forEach(item => {
                idList.push(item.id);
            })

            for (const id of idList) {
                cardList.push(id);
            }
        })
        let cardRender = {cards: cardList}
        res.render('monsters', cardRender);
    } else {
        res.redirect('/');
    }
})

router.get('/battlefield', async (req, res) => {
    if(req.session.logged_in) {
        res.render('battlefield');
    } else {
        res.redirect('/');
    }
})

router.get('/logout', async (req, res) => {
    if(req.session.logged_in) {
        delete req.session;
    }
    res.render('homepage');
})

module.exports = router;
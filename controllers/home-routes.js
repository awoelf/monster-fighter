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
            console.log(deckRender);
            res.render('dashboard', deckRender);
        } catch (e) {
            console.error(e);
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
            const deckCount = userDecks.length;
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
                });
                const cards = await joins.map((val) => {
                    return {id: val.dataValues.id};
                });
                console.log(cards);
                decks.push({deckName: deck.dataValues.deck_name, cards});
            }
            console.log(decks);
            const renderObj = {name: name, deckCount: deckCount, decks: decks};
            console.log(renderObj);
            res.render('player', renderObj);
        } catch (e) {
            console.error(e);
            res.render('player');
        }
        
    } else {
        res.redirect('/');
    }
})

router.get('/monsters', async (req, res) => {
    if(req.session.logged_in) {
        let idList = [];
        let deckList = [];
        Card.findAll()
        .then((allCards) => {
            allCards.forEach(item => {
                idList.push({id: item.id, name: item.name});
            })
        })
        const userDecks = await Deck.findAll({
            where: {
                user_id: req.session.user_id
            },
            group: 'deck_name'
        });
        for (const deck of userDecks) {
            deckList.push({deckName: deck.dataValues.deck_name});
        }
        console.log(deckList);
        let cardRender = {decks: deckList, cards: idList}
        res.render('monsters', cardRender);
    } else {
        res.redirect('/');
    }
})

//TODO: move battlefield rendering logic to its own controller when creating the game aspwct
router.get('/battlefield', async (req, res) => {
    if(req.session.logged_in) {
        try{
            const joins = await Card.findAll({
                include: {
                    model: Deck,
                    where: {
                        deck_name: req.session.deck,
                        user_id: req.session.user_id
                    }
                },
                //remove limit when actually adding game logic, purpose is to just render 5 cards on screen
                limit: 5
            });
            const cardRender = joins.map((val) => {
                return {id: val.dataValues.id}
            });
            res.render('battlefield', {cards: cardRender});
        } catch (e) {
            console.error(e);
        }
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
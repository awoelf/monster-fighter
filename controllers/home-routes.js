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
            console.log(e);
            res.render('dashboard');
        }
    } else {
        res.redirect('/');
    }
    
})

router.get('/player', async (req, res) => {
    if(req.session.logged_in) {
        res.render('player');
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
                idList.push(item.id);
            })
        })
        Deck.findAll()
        .then((allDecks) => {
            allDecks.forEach(item => {
                deckList.push(item.deck_name);
            })
        })
        let cardRender = {decks: deckList, cardId: idList}
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
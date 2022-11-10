const e = require('express');

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
        res.render('dashboard');
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
        res.render('monsters');
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
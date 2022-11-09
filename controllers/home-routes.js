const router = require('express').Router();

// Route for the homepage
router.get('/', async (req, res) => {
    res.render('homepage');
})

router.get('/dashboard', async (req, res) => {
    res.render('dashboard');
})

router.get('/player', async (req, res) => {
    res.render('player');
})

router.get('/monsters', async (req, res) => {
    res.render('monsters');
})

router.get('/battlefield', async (req, res) => {
    res.render('battlefield');
})

router.get('/logout', async (req, res) => {
    res.render('homepage');
})

module.exports = router;
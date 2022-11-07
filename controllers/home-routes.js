const router = require('express').Router();

// Route for the homepage
router.get('/', async (req, res) => {
    res.render('dashboard');
})

module.exports = router;
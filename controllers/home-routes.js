const router = require('express').Router();

// Route for the homepage
router.get('/', async (req, res) => {
    res.render('monsters');
})

module.exports = router;
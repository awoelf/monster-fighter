const router = require('express').Router();
const userRoutes = require('./user')
const card = require('../api/card');
const deck = require('../api/deck')
const monsterRoutes = require('./monster');

// Put routes here
router.use('/monsters', monsterRoutes);
router.use('/users', userRoutes);
router.use('/card', card);
router.use('/deck', deck);

module.exports = router;
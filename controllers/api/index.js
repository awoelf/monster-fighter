const router = require('express').Router();
const userRoutes = require('./user')
const card = require('../api/card');
const monsterRoutes = require('./monster');

// Put routes here
// router.use('/monster', monsterRoutes);
router.use('/users', userRoutes);
router.use('/card', card);

module.exports = router;
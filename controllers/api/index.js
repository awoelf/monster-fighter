const router = require('express').Router();
const userRoutes = require('./user');
const monsterRoutes = require('./monster');
// Put routes here
// router.use('/monster', monsterRoutes);
router.use('/users', userRoutes);

module.exports = router;
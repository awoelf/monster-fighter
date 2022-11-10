const router = require('express').Router();
<<<<<<< HEAD
const userRoutes = require('../')
const card = require('../api/card');
// Put ait routes here
=======
const userRoutes = require('./user');
const monsterRoutes = require('./monster');
// Put routes here
// router.use('/monster', monsterRoutes);
router.use('/users', userRoutes);
>>>>>>> 3c82eca1f0a6e1d61c1244635348cf009a009daa

router.use('/card', card);

module.exports = router;
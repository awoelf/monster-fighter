const router = require('express').Router();
const userRoutes = require('../')
const card = require('../api/card');
// Put ait routes here

router.use('/card', card);

module.exports = router;
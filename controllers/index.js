const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const battleRoutes = require('./battlepage-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/battleRoutes', battleRoutes);

module.exports = router;
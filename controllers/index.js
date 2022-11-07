const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const battleroutes = require('./battlepage-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
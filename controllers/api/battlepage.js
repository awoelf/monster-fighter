// Post put, delete
const router = require('express').Router();
const firebase = require("firebase/app")

router.post('/chat', async (req, res) => {
  console.log('req.body =', req.body)
});

module.exports = router;
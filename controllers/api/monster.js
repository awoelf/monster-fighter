const router = require('express').Router();
const {Card, User, Deck} = require('../../models');

// router.get('/getdecks', async (req, res) => {
//     try{
//         const deckList = [];
//         const userDecks = await Deck.findAll({
//             where: {
//                 user_id: req.session.user_id
//             },
//             group: 'deck_name'
//         });
//         for (const deck of userDecks) {
//             deckList.push(deck.dataValues.deck_name);
//         }
//         var decks = await deckList.map((deckName) => {
//             return {deckName};
//         })
//         res.render('dashboard', decks);
//     } catch (e) {
//         res.status(400).json({ message: "Unable to find any decks for the user." });
//     }
// });

module.exports = router;
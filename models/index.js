const Card = require('./Card');
const User = require('./User');
const Deck = require('./Deck');

Deck.hasMany(Card, {
    foreignKey: 'card_id',
    onDelete: 'CASCADE'
});
Card.belongsTo(Deck);
module.exports = {Card, User, Deck};
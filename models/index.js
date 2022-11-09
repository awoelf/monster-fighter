const Card = require('./Card');
const User = require('./users');
const Deck = require('./Deck');

Card.hasMany(Deck, {
    foreignKey: 'card_id',
    onDelete: 'CASCADE'
});
User.hasMany(Deck, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Deck.belongsTo(Card);
module.exports = {Card, User, Deck};
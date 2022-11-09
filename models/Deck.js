const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Deck extends Model {}

Deck.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        deck_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // card_name: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // card_hitpoints: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        // card_attack_bonus: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // card_armor: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // card_damage: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // card_cost: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // card_image: {
        //     type: DataTypes.STRING
        // },
        // in_deck: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: true
        // },
        // in_hand: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: false
        // },
        // in_field: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: false
        // },
        // is_dead: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: false
        // }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'deck',
        timestamps: false,
        underscored: true
    }
);

module.exports = Deck;


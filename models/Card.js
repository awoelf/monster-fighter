const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {}

Card.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hitpoints: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        attack_bonus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        armor: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        damage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'card',
        timestamps: false,
        underscored: true
    }
);

module.exports = Card;
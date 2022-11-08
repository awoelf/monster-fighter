const monsters = require('./monsters.json');
const axios = require('axios');
const URL = "https://www.dnd5eapi.co"
const {Card} = require('../models');
const { Sequelize } = require('sequelize');
const Dice = require('../utils/Dice');
const sequelize = require('../config/connection');

sequelize.sync({force: false}).then(() => {
    main();
})

async function main() {
    monsters.results.forEach(async (monster) => {
        try {
            const card = await Card.findOne({
                where: {
                    name: monster.name
                }
            });
            if(card === null) {
                let response = await axios({
                    method: 'GET',
                    url: `${URL}${monster.url}`
                });
                await Card.create(getCardAttributes(response.data));
                console.log(`Seeding ${monster.name} from ${monster.url}`);
            } else {
                console.log(`The ${monster.name} card already exists.`);
            }
        }
        catch (e) {
            console.error(e);
        }
        
    })
}

function getCardAttributes(data) {
    //make some default values for non null attributes in case the entry attribute isn't in the api
    var name = data.name? data.name : "monster";
    var hitpoints = data.hit_points? Number(data.hit_points) : 10;
    var armor = data.armor_class ? Number(data.armor_class) : 10;
    var image = data.image? data.image : null;
    var damage = "1d0";
    var attackBonus = 0;

    for(const action of data.actions) {
        if(action.damage)
        {
            if(action.damage[0].damage_dice)
            {
                action.attack_bonus ? attackBonus=action.attack_bonus : 0;
                damage = action.damage[0].damage_dice;
                break;
            }
        }
    }

    var damageRollValues = Dice.prototype.getDamageRollValues(damage);
    var cost = getCost(armor, hitpoints, attackBonus, damageRollValues);
    return {
        name: name,
        hitpoints: hitpoints,
        armor: armor,
        image: image,
        damage: damage,
        attack_bonus: attackBonus,
        cost: cost
    }
}

//obtain cost of monsters based on their attributes
//armor, hitpoints, attackBonus : number
//damage : [damage rolls: number, max damage: number, damageBonus: number] (from Dice class)
function getCost(armor, hitpoints, attackBonus, damage)
{
    let cost = 0;
    cost += (armor - 10) * (armor - 10 - 2);
    cost += (hitpoints - 10) / 5;
    cost += attackBonus * 2;
    cost += damage[0] * damage[1] + damage[2] * 2;
    cost /= 10;
    if(Math.floor(cost) < 0) cost = 0;
    if(Math.floor(cost) > 20) cost = 20;
    return cost;
}

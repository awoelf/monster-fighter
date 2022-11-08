class Dice {
    //attackRollValues[x, y, z] -> [number of rolls, max roll value, roll bonus] | "3d6+4" -> [3, 6, 4]
    constructor(damageDiceString, attackBonus) {
        this.damageRollValues = [1, 0, 0];
        this.attackBonus = attackBonus? attackBonus : 0;
        const matches = [...damageDiceString.matchAll(/\d+/g)];
        for(let i = 0; i < matches.length; i++)
        {
            this.damageRollValues[i] = Number(matches[i][0]);
        }
    }

    rollDamage() {
        let rollSum = 0;
        if(this.damageRollValues = [1, 0, 0]) return 1;
        for(let i = 0; i < this.damageRollValues[0]; i++)
        {
            rollSum += Math.floor(Math.random() * this.damageRollValues[1] + 1);
        }
        rollSum += this.damageRollValues[2];
        return rollSum;
    }

    rollHit() {
        return (Math.floor(Math.random() * 20 + 1) + this.attackBonus);
    }
}

Dice.prototype.getDamageRollValues = function(damageDiceString) {
    let damageDiceRolls = [1, 0, 0];
    const matches = [...damageDiceString.matchAll(/\d+/g)];
    for(let i = 0; i < matches.length; i++)
    {
        damageDiceRolls[i] = Number(matches[i][0]);
    }
    return damageDiceRolls;
}

module.exports = Dice;
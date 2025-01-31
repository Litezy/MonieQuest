module.exports = (sequelize, DataTypes) => {
    return sequelize.define('util', {
        exchange_rate: { type: DataTypes.FLOAT },
        giftcard_rate: { type: DataTypes.FLOAT },
    })
}
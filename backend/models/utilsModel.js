module.exports = (sequelize, DataTypes) => {
    return sequelize.define('util', {
        exchange_rate: { type: DataTypes.FLOAT, defaultValue: 1600 },
        giftcard_rate: { type: DataTypes.FLOAT, defaultValue: 1500 },
    })
}
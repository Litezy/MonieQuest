module.exports = (sequelize, DataTypes) => {
    return sequelize.define('uti', {
        exchange_buy_rate: { type: DataTypes.FLOAT, defaultValue: 1600 },
        exchange_sell_rate: { type: DataTypes.FLOAT, defaultValue: 1600 },
        giftcard_rate: { type: DataTypes.FLOAT, defaultValue: 1500 },
    })
}
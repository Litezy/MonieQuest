module.exports = (sequelize, DataTypes) => {
    return sequelize.define('util', {
        exchange_buy_rate: { type: DataTypes.FLOAT, defaultValue: 1600 },
        exchange_sell_rate: { type: DataTypes.FLOAT, defaultValue: 1600 },
        buy_min: { type: DataTypes.FLOAT, defaultValue: 10 }, //in USD
        buy_max: { type: DataTypes.FLOAT, defaultValue: 2000 }, // in USD
        sell_min: { type: DataTypes.FLOAT, defaultValue: 10 }, //in USD
        sell_max: { type: DataTypes.FLOAT, defaultValue: 2000 }, // in USD
        bank_withdraw_min: { type: DataTypes.FLOAT, defaultValue: 10000 }, // in NGN
        giftcard_rate: { type: DataTypes.FLOAT, defaultValue: 1500 },
        kyc_threshold: { type: DataTypes.FLOAT, defaultValue: 5000 },
    })
}
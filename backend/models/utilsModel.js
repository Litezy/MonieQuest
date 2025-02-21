module.exports = (sequelize, DataTypes) => {
    return sequelize.define('util', {
        exchange_buy_rate: { type: DataTypes.FLOAT, defaultValue: 1600 },
        exchange_sell_rate: { type: DataTypes.FLOAT, defaultValue: 1600 },
        buy_min: { type: DataTypes.FLOAT, defaultValue: 10 },
        buy_max: { type: DataTypes.FLOAT, defaultValue: 2000 },
        sell_min: { type: DataTypes.FLOAT, defaultValue: 10 },
        sell_max: { type: DataTypes.FLOAT, defaultValue: 2000 },
        bank_withdraw_min: { type: DataTypes.FLOAT, defaultValue: 10000 },
        giftcard_rate: { type: DataTypes.FLOAT, defaultValue: 1500 },
        kyc_threshold: { type: DataTypes.FLOAT, defaultValue: 5000 },
        leaderboard_reward: { type: DataTypes.FLOAT, defaultValue: 25 },
    })
}
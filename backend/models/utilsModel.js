module.exports = (sequelize, DataTypes) => {
    return sequelize.define('util', {
        exchange_buy_rate: { type: DataTypes.FLOAT, defaultValue: 1600 },
        exchange_sell_rate: { type: DataTypes.FLOAT, defaultValue: 1600 },
        bank_withdraw_min: { type: DataTypes.FLOAT, defaultValue: 10000 },
        giftcard_rate: { type: DataTypes.FLOAT, defaultValue: 1500 },
        leaderboard_reward: { type: DataTypes.FLOAT, defaultValue: 25 },
    })
}
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('wallet', {
        user: { type: DataTypes.INTEGER },
        total_deposit: { type: DataTypes.FLOAT, defaultValue: 0, },
        total_outflow: { type: DataTypes.FLOAT, defaultValue: 0, },
        balance: { type: DataTypes.FLOAT, defaultValue: 0, },
    })
}
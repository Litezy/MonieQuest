module.exports = (sequelize, DataTypes) => {
    return sequelize.define('bank', {
        user: { type: DataTypes.INTEGER },
        bank_name: { type: DataTypes.STRING },
        account_number: { type: DataTypes.STRING },
        account_name: { type: DataTypes.STRING },
    })
}
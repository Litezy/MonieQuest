module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transaction', {
        user: { type: DataTypes.INTEGER },
        gen_id: { type: DataTypes.STRING },
    })
}
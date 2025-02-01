module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transaction', {
        user: { type: DataTypes.INTEGER },
        gen_id: { type: DataTypes.STRING },
        tag: { type: DataTypes.STRING },
        type: { type: DataTypes.STRING, allowNull: true },
        amount: { type: DataTypes.FLOAT },
        status: { type: DataTypes.STRING, defaultValue: 'pending' },
    })
}
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('card', {
        name: { type: DataTypes.STRING, allowNull: false },
        gen_id: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
    })
}
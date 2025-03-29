module.exports = (sequelize, DataTypes) => {
    return sequelize.define('card_category', {
        country: { type: DataTypes.STRING, allowNull: false },
        regrex: { type: DataTypes.INTEGER, allowNull: true },
        card_id: { type: DataTypes.INTEGER, allowNull: false },
        currency: { type: DataTypes.STRING, allowNull: false },
        card_pic: { type: DataTypes.STRING, allowNull: true,defaultValue:'true' },
        min_value: { type: DataTypes.FLOAT, allowNull: false },
        max_value: { type: DataTypes.FLOAT, allowNull: false },
        rate: { type: DataTypes.FLOAT, allowNull: false },
    })
}
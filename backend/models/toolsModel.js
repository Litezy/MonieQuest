module.exports = (sequelize, DataTypes) => {
    return sequelize.define('tool', {
        name: { type: DataTypes.STRING, allowNull: false },
        features: { type: DataTypes.JSON },
    }
    )
}
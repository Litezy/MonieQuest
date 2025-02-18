module.exports = (sequelize, DataTypes) => {
    return sequelize.define('subscriber', {
        email: { type: DataTypes.STRING },
        phone_number: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING, defaultValue: 'true' },
    })
}
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        image: { type: DataTypes.STRING, allowNull: true },
        first_name: { type: DataTypes.STRING },
        surname: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        phone_number: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        email_verified: { type: DataTypes.STRING,defaultValue:false },
    })
}
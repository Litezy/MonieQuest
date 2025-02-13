module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        blog: { type: DataTypes.INTEGER },
        username: { type: DataTypes.STRING },
        email_address: { type: DataTypes.STRING },
        phone_number: { type: DataTypes.STRING, allowNull: true  },
        content: { type: DataTypes.STRING },
    })
}
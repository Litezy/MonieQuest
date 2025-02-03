module.exports = (sequelize, DataTypes) => {
    return sequelize.define('kyc', {
        user: { type: DataTypes.INTEGER },
        front_image: { type: DataTypes.STRING },
        back_image: { type: DataTypes.STRING },
        id_type: { type: DataTypes.STRING },
        id_number: { type: DataTypes.STRING },
        address: { type: DataTypes.STRING },
        date_of_birth: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING, defaultValue: 'processing' },
    })
}
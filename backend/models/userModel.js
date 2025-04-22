module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        image: { type: DataTypes.STRING, allowNull: true },
        first_name: { type: DataTypes.STRING },
        surname: { type: DataTypes.STRING }, 
        email: { type: DataTypes.STRING },
        unique_Id: { type: DataTypes.STRING ,allowNull:false},
        phone_number: { type: DataTypes.STRING ,allowNull:true},
        password: { type: DataTypes.STRING,allowNull:true },
        role: { type: DataTypes.STRING, defaultValue: 'user' },
        email_verified: { type: DataTypes.STRING, defaultValue: 'false' },
        kyc_verified: { type: DataTypes.STRING, defaultValue: 'false' },
        resetcode: { type: DataTypes.STRING, allowNull: true },
        google: { type: DataTypes.STRING, allowNull: false, defaultValue: 'false' },
        airdrop_permit: { type: DataTypes.STRING,  defaultValue: 'false' },
        blog_permit: { type: DataTypes.STRING, defaultValue: 'false' },
        product_permit: { type: DataTypes.STRING, defaultValue: 'false' },
        giftcard_permit: { type: DataTypes.STRING, defaultValue: 'false' },
        exchange_permit: { type: DataTypes.STRING, defaultValue: 'false' },
        suspend: { type: DataTypes.STRING, defaultValue: 'false' },
    })
}

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transaction', {
        user: { type: DataTypes.INTEGER },
        trans_id: { type: DataTypes.STRING },
        reference_id: { type: DataTypes.STRING,allowNull:true },
        bank_name: { type: DataTypes.STRING,allowNull:true },
        account_number: { type: DataTypes.STRING,allowNull:true },
        account_name: { type: DataTypes.STRING,allowNull:true },
        tag: { type: DataTypes.STRING },
        type: { type: DataTypes.STRING, allowNull: true },
        amount: { type: DataTypes.FLOAT },
        gift_brand: { type: DataTypes.STRING },
        network: { type: DataTypes.STRING },
        wallet_address: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING, defaultValue: 'pending' },
    })
}
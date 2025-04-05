module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exchange-buy', {
        crypto_currency: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false, defaultValue: 'buy' },
        wallet_address: { type: DataTypes.STRING, allowNull: false },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        amount_in_naira: { type: DataTypes.FLOAT, allowNull: true },
        gas_fee: { type: DataTypes.FLOAT, allowNull: false },
        network: { type: DataTypes.STRING, allowNull: false },
        tag: { type: DataTypes.TEXT, allowNull: false, defaultValue: 'crypto' },
        order_no: { type: DataTypes.STRING, allowNull: false },
        wallet_exp: { type: DataTypes.STRING, allowNull: true },
        rate: { type: DataTypes.FLOAT, allowNull: false },
        userid: { type: DataTypes.INTEGER, },
        status: { type: DataTypes.STRING, defaultValue: 'unpaid' },
        trans_hash: { type: DataTypes.STRING, allowNull: true },
        reference: { type: DataTypes.STRING, allowNull: true }
    })
}
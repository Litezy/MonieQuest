module.exports = (sequelize, DataTypes) => {
    return sequelize.define('withdrawal', {
        userid: { type: DataTypes.INTEGER, allowNull: false },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        account_number: { type: DataTypes.STRING, allowNull: false },
        transfer_status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
        bank_name: { type: DataTypes.STRING, allowNull: false },
        bank_holder: { type: DataTypes.STRING, allowNull: false },
        bank_code: { type: DataTypes.STRING, allowNull: false },
        trans_id: { type: DataTypes.STRING, allowNull: false },
        reference_id: { type: DataTypes.STRING, allowNull: true },
        tag: { type: DataTypes.STRING, allowNull: false, defaultValue: 'bank' },
        status: { type: DataTypes.STRING, defaultValue: 'pending' },
    })
}
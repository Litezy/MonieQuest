module.exports = (sequelize, DataTypes) => {
    return sequelize.define('giftcard', {
        brand: { type: DataTypes.STRING, allowNull: false },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        code: { type: DataTypes.TEXT, allowNull: false },
        order_no: { type: DataTypes.TEXT, allowNull: false },
        pin: { type: DataTypes.TEXT, allowNull: true },
        userid: { type: DataTypes.INTEGER },
        tag:{type: DataTypes.TEXT, allowNull:false,defaultValue:'giftcard'},
        status:{type: DataTypes.TEXT,defaultValue:'pending'}
    })
}
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('giftcard', {
        brand: { type: DataTypes.STRING, allowNull: false },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        code: { type: DataTypes.STRING, allowNull: true },
        order_no: { type: DataTypes.STRING, allowNull: false },
        country: { type: DataTypes.STRING, allowNull: false },
        currency: { type: DataTypes.STRING, allowNull: false },
        pin: { type: DataTypes.STRING, allowNull: true },
        images: { type: DataTypes.JSON, allowNull: true },
        userid: { type: DataTypes.INTEGER },
        rate:{type: DataTypes.STRING, allowNull:false},
        tag:{type: DataTypes.STRING, allowNull:false,defaultValue:'giftcard'},
        type:{type: DataTypes.STRING, allowNull:false,},
        status:{type: DataTypes.STRING,defaultValue:'pending'}
    })
}
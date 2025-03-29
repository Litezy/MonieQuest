module.exports = (sequelize, DataTypes) => {
    return sequelize.define('giftcard', {
        brand: { type: DataTypes.STRING, allowNull: false },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        code: { type: DataTypes.TEXT, allowNull: true },
        order_no: { type: DataTypes.TEXT, allowNull: false },
        pin: { type: DataTypes.TEXT, allowNull: true },
        userid: { type: DataTypes.INTEGER },
        gen_id:{type: DataTypes.STRING,allowNull:true},
        rate:{type: DataTypes.STRING, allowNull:false},
        tag:{type: DataTypes.TEXT, allowNull:false,defaultValue:'giftcard'},
        status:{type: DataTypes.TEXT,defaultValue:'pending'}
    })
}
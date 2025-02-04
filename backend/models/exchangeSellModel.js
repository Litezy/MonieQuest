module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('exchange-sell',{
        crypto_currency:{type: DataTypes.STRING, allowNull:false},
        type:{type: DataTypes.STRING, allowNull:false,defaultValue:'sell'},
        trans_hash:{type: DataTypes.STRING, allowNull:false},
        amount:{type: DataTypes.STRING, allowNull:false},
        order_no:{type: DataTypes.STRING, allowNull:false},
        userid:{type: DataTypes.INTEGER},
        status:{type: DataTypes.TEXT,defaultValue:'unpaid'}
    })
}
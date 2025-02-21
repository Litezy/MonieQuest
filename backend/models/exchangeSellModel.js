module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('exchange-sell',{
        crypto_currency:{type: DataTypes.STRING, allowNull:false},
        type:{type: DataTypes.STRING, allowNull:false,defaultValue:'sell'},
        trans_hash:{type: DataTypes.STRING, allowNull:false},
        amount:{type: DataTypes.STRING, allowNull:false},
        order_no:{type: DataTypes.STRING, allowNull:false},
        network:{type: DataTypes.TEXT, allowNull:false},
        tag:{type: DataTypes.TEXT, allowNull:false,defaultValue:'crypto'},
        userid:{type: DataTypes.INTEGER},
        rate:{type: DataTypes.STRING, allowNull:false},
        status:{type: DataTypes.TEXT,defaultValue:'pending'}
    })
}
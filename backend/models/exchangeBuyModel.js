module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('exchange-buy',{
        crypto_currency:{type: DataTypes.STRING, allowNull:false},
        type:{type: DataTypes.STRING, allowNull:false,defaultValue:'buy'},
        wallet_address:{type: DataTypes.STRING, allowNull:false},
        amount:{type: DataTypes.STRING, allowNull:false},
        network:{type: DataTypes.STRING, allowNull:false},
        tag:{type: DataTypes.TEXT, allowNull:false,defaultValue:'crypto'},
        order_no:{type: DataTypes.STRING, allowNull:false},
        wallet_exp:{type: DataTypes.STRING, allowNull:true},
        userid:{type: DataTypes.INTEGER,},
        status:{type: DataTypes.TEXT,defaultValue:'unpaid'}
    })
}
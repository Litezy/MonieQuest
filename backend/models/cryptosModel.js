module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('crypto',{
        name:{ type: DataTypes.STRING, allowNull:false},
        network:{ type: DataTypes.STRING, allowNull:false},
        wallet_add:{ type: DataTypes.STRING, allowNull:false},
        symbol:{ type: DataTypes.STRING, allowNull:false},
    })
}
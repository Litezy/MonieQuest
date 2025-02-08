module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('withdrawal',{
        userid:{type: DataTypes.INTEGER, allowNull:false},
        amount:{type: DataTypes.FLOAT, allowNull:false},
        account_number:{type: DataTypes.STRING, allowNull:false},
        bank_name:{type: DataTypes.STRING, allowNull:false},
        bank_user:{type: DataTypes.STRING, allowNull:false},
        trans_id:{type: DataTypes.STRING, allowNull:false},
        reference_id:{type: DataTypes.STRING, allowNull:true},
        tag:{type: DataTypes.TEXT, allowNull:false,defaultValue:'bank'},
        status:{type: DataTypes.STRING, defaultValue:'pending'},
    })
}
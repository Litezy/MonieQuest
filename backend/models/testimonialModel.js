module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('testimonial',{
        image:{type: DataTypes.TEXT, allowNull:false},
        lastname:{type: DataTypes.STRING, allowNull:true},
        firstname:{type: DataTypes.STRING, allowNull:false},
        title:{type: DataTypes.STRING, allowNull:false},
        content:{type: DataTypes.TEXT, allowNull:false},
    })
}
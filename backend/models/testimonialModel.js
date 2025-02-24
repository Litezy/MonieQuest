module.exports = (sequelize,DataTypes) =>{
    return sequelize.define('testimonial',{
        image:{type: DataTypes.STRING, allowNull:false},
        lastname:{type: DataTypes.STRING, allowNull:false},
        firstname:{type: DataTypes.STRING, allowNull:false},
        title:{type: DataTypes.STRING, allowNull:false},
        gen_id:{type: DataTypes.STRING, allowNull:false},
        content:{type: DataTypes.STRING, allowNull:false},
    })
}
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('blog', {
        user: { type: DataTypes.INTEGER },
        gen_id: { type: DataTypes.STRING },
        slug: { type: DataTypes.STRING },
        image: { type: DataTypes.STRING },
        title: { type: DataTypes.TEXT },
        feature: { type: DataTypes.STRING },
        main_header_title: {type:DataTypes.TEXT},
        main_header_content: { type: DataTypes.STRING },
        first_paragraph_subtitle: { type: DataTypes.TEXT },
        first_paragraph_content: { type: DataTypes.STRING },
        second_paragraph_subtitle: { type: DataTypes.TEXT },
        second_paragraph_content: { type: DataTypes.STRING },
        second_paragraph_image: { type: DataTypes.STRING,allowNull:true },
        extras_title: { type: DataTypes.TEXT },
        extras_content: { type: DataTypes.STRING },
        extras_image: { type: DataTypes.STRING,allowNull:true },
        conclusion: { type: DataTypes.STRING },
    })
}
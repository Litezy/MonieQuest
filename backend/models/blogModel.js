module.exports = (sequelize, DataTypes) => {
    return sequelize.define('blog', {
        user: { type: DataTypes.INTEGER },
        gen_id: { type: DataTypes.STRING },
        slug: { type: DataTypes.STRING },
        image: { type: DataTypes.TEXT },
        title: { type: DataTypes.TEXT('long') },
        feature: { type: DataTypes.STRING },
        main_header_title: { type: DataTypes.TEXT('long') },
        main_header_content: { type: DataTypes.TEXT('long') },
        first_paragraph_title: { type: DataTypes.TEXT('long') },
        first_paragraph_content: { type: DataTypes.TEXT('long') },
        second_paragraph_title: { type: DataTypes.TEXT('long') },
        second_paragraph_content: { type: DataTypes.TEXT('long') },
        second_paragraph_image: { type: DataTypes.TEXT, allowNull: true },
        extras_title: { type: DataTypes.TEXT('long') },
        extras_content: { type: DataTypes.TEXT('long') },
        extras_image: { type: DataTypes.TEXT, allowNull: true },
        conclusion: { type: DataTypes.TEXT('long') },
    });
}

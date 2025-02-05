module.exports = (sequelize, DataTypes) => {
    return sequelize.define('blog', {
        user: { type: DataTypes.INTEGER },
        gen_id: {type: DataTypes.STRING},
        slug: {type: DataTypes.STRING},
        image: { type: DataTypes.STRING },
        title: { type: DataTypes.STRING },
        feature: { type: DataTypes.STRING },
        main_header: { type: DataTypes.TEXT },
        first_paragraph: { type: DataTypes.TEXT },
        second_paragraph: { type: DataTypes.TEXT },
        extras: { type: DataTypes.TEXT, allowNull: true  },
        conclusion: { type: DataTypes.TEXT, allowNull: true  },
    })
}
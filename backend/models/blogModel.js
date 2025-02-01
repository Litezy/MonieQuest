module.exports = (sequelize, DataTypes) => {
    return sequelize.define('blog', {
        user: { type: DataTypes.INTEGER },
        gen_id: {type: DataTypes.STRING},
        slug: {type: DataTypes.STRING},
        image: { type: DataTypes.STRING },
        title: { type: DataTypes.STRING },
        feature: { type: DataTypes.STRING },
        main_header: { type: DataTypes.STRING },
        first_paragraph: { type: DataTypes.STRING },
        second_paragraph: { type: DataTypes.STRING, defaultValue: 'active' },
        extras: { type: DataTypes.STRING, allowNull: true  },
        conclusion: { type: DataTypes.STRING, allowNull: true  },
    })
}
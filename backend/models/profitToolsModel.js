module.exports = (sequelize, DataTypes) => {
    return sequelize.define('profit_tool', {
        user: { type: DataTypes.INTEGER },
        gen_id: {type: DataTypes.STRING},
        slug: {type: DataTypes.STRING},
        title: { type: DataTypes.STRING },
        category: { type: DataTypes.JSON, defaultValue:[] },
        price: { type: DataTypes.FLOAT },
        about: { type: DataTypes.STRING },
        feature1: { type: DataTypes.STRING },
        feature2: { type: DataTypes.STRING },
        bank_name: { type: DataTypes.STRING },
        account_number: { type: DataTypes.STRING },
        account_name: { type: DataTypes.STRING },
        video_link: { type: DataTypes.STRING },
        contact_details: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING, defaultValue: 'pending' },
        list_status: { type: DataTypes.STRING, defaultValue: 'unlisted' },
        discount: { type: DataTypes.FLOAT, defaultValue: 0, allowNull: true },
        discount_duration: { type: DataTypes.STRING, allowNull: true },
    })
}
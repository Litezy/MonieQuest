module.exports = (sequelize, DataTypes) => {
    return sequelize.define('airdrop', {
        user: { type: DataTypes.INTEGER },
        gen_id: { type: DataTypes.STRING },
        slug: { type: DataTypes.STRING },
        logo_image: { type: DataTypes.STRING },
        banner_image: { type: DataTypes.STRING },
        title: { type: DataTypes.STRING },
        category: { type: DataTypes.STRING },
        blockchain: { type: DataTypes.STRING },
        kyc: { type: DataTypes.STRING, defaultValue: 'required' },
        type: { type: DataTypes.STRING },
        format: { type: DataTypes.STRING },
        level: { type: DataTypes.STRING },
        referral_link: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING, defaultValue: 'open' },
        about: { type: DataTypes.TEXT },
        steps: { type: DataTypes.JSON },
        video_guide_link: { type: DataTypes.STRING },
        twitter_link: { type: DataTypes.STRING, allowNull: true },
        telegram_link: { type: DataTypes.STRING, allowNull: true },
        website_link: { type: DataTypes.STRING, allowNull: true },
    })
}
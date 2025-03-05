module.exports = (sequelize, DataTypes) => {
    return sequelize.define('carouselImage', {
        image: { type: DataTypes.STRING },
        unique_Id: { type: DataTypes.STRING }
    })
}
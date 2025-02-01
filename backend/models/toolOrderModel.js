module.exports = (sequelize, DataTypes) => {
    return sequelize.define('tool_order', {
        gen_id: { type: DataTypes.STRING },
        email_address: { type: DataTypes.STRING },
        total_price: { type: DataTypes.FLOAT },
        total_discount: { type: DataTypes.FLOAT },
        amount_paid: { type: DataTypes.FLOAT },
        status: { type: DataTypes.STRING },
        products: { type: DataTypes.JSON,defaultValue:[] },
    })
}
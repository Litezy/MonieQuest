module.exports = (sequelize, DataTypes) => {
    return sequelize.define('product_order', {
        gen_id: { type: DataTypes.STRING },
        email_address: { type: DataTypes.STRING },
        reference: { type: DataTypes.STRING },
        total_price: { type: DataTypes.FLOAT },
        total_discount: { type: DataTypes.FLOAT ,alowNull: true},
        amount_paid: { type: DataTypes.FLOAT },
        status: { type: DataTypes.STRING },
        products: { type: DataTypes.JSON, defaultValue: [] },
    })
}
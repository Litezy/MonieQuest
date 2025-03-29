const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config()

const isproduction = process.env.NODE_ENV === 'production'
const sequelize = new Sequelize(isproduction ? process.env.DB_NAME : 'moniequest', isproduction ? process.env.DB_USER : 'root', isproduction ? process.env.DB_PASSWORD : '', {
  host: isproduction ? process.env.DB_HOST : 'localhost',
  dialect: isproduction ? process.env.DB_DIALECT : 'mysql'
});

sequelize.authenticate()
    .then(() => { console.log(`Db connected`) })
    .catch((error) => { console.log(error) })

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require('./userModel')(sequelize, DataTypes)
db.wallets = require('./walletModel')(sequelize, DataTypes)
db.notifications = require('./notificationModel')(sequelize, DataTypes)
db.products = require('./productModel')(sequelize, DataTypes)
db.airdrops = require('./airdropModel')(sequelize, DataTypes)
db.blogs = require('./blogModel')(sequelize, DataTypes)
db.kyc = require('./kycModel')(sequelize, DataTypes)
db.productOrders = require('./productOrderModel')(sequelize, DataTypes)
db.banks = require('./bankModel')(sequelize, DataTypes)
db.utils = require('./utilsModel')(sequelize, DataTypes)
db.exchangeBuys = require(`./exchangeBuyModel`)(sequelize, DataTypes)
db.exchangeSells = require(`./exchangeSellModel`)(sequelize, DataTypes)
db.giftCards = require(`./giftCardModel`)(sequelize, DataTypes)
db.withdrawals = require(`./withdrawalModel`)(sequelize, DataTypes)
db.comments = require(`./commentModel`)(sequelize, DataTypes)
db.subscribers = require(`./subscriberModel`)(sequelize, DataTypes)
db.carouselImages = require(`./carouselImageModel`)(sequelize, DataTypes)
db.testimonials = require(`./testimonialModel`)(sequelize, DataTypes)
db.cryptos = require(`./cryptosModel`)(sequelize, DataTypes)
db.tools = require(`./toolsModel`)(sequelize, DataTypes)
db.cardCategory = require(`./cardCategoryModel`)(sequelize, DataTypes)
db.cards = require(`./cardModel`)(sequelize, DataTypes)


//One to Many relationships
db.users.hasMany(db.exchangeBuys, { foreignKey: 'userid', as: "crypto_buyers" })
db.users.hasMany(db.exchangeSells, { foreignKey: 'userid', as: "crypto_sellers" })
db.users.hasMany(db.giftCards, { foreignKey: 'userid', as: "gift_sellers" })
db.users.hasMany(db.withdrawals, { foreignKey: 'userid', as: "user_withdrawals" })
db.users.hasOne(db.wallets, { foreignKey: 'user', as: "user_wallets" })
db.users.hasOne(db.banks, { foreignKey: 'user', as: "user_banks" })
db.users.hasOne(db.kyc, { foreignKey: 'user', as: "user_kycs" })
db.users.hasMany(db.products, { foreignKey: 'user', as: "user_products" })
db.users.hasMany(db.blogs, { foreignKey: 'user', as: "user_blogs" })
db.blogs.hasMany(db.comments, { foreignKey: 'blog', as: "blog_comments" })
db.cards.hasMany(db.cardCategory, { foreignKey: 'card_id', as: "card_categories" })

// One to One relationships
db.exchangeBuys.belongsTo(db.users, { foreignKey: 'userid', as: "crypto_buyer" })
db.exchangeSells.belongsTo(db.users, { foreignKey: 'userid', as: "crypto_seller" })
db.giftCards.belongsTo(db.users, { foreignKey: 'userid', as: "gift_seller" })
db.withdrawals.belongsTo(db.users, { foreignKey: 'userid', as: "user_withdrawal" })
db.wallets.belongsTo(db.users, { foreignKey: 'user', as: "user_wallet" })
db.banks.belongsTo(db.users, { foreignKey: 'user', as: "user_bank" })
db.kyc.belongsTo(db.users, { foreignKey: 'user', as: "user_kyc" })
db.products.belongsTo(db.users, { foreignKey: 'user', as: "product_user" })
db.blogs.belongsTo(db.users, { foreignKey: 'user', as: "blog_user" })
db.comments.belongsTo(db.blogs, { foreignKey: 'blog', as: "blog_comments" })
db.cardCategory.belongsTo(db.cards, { foreignKey: 'card_id', as: "card_category" })

db.sequelize.sync({ force: false })
.then(() => console.log(`Connection has been established successfully on ${isproduction ? 'online db' : 'local db'} `))
.catch((error) => console.log(error))
module.exports = db
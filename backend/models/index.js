const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
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
db.profitTools = require('./profitToolsModel')(sequelize, DataTypes)
db.airdrops = require('./airdropModel')(sequelize, DataTypes)
db.blogs = require('./blogModel')(sequelize, DataTypes)
db.kyc = require('./kycModel')(sequelize, DataTypes)
db.toolsOrders = require('./toolOrderModel')(sequelize, DataTypes)
db.banks = require('./bankModel')(sequelize, DataTypes)
db.utils = require('./utilsModel')(sequelize, DataTypes)
db.exchangeBuys = require(`./exchangeBuyModel`)(sequelize, DataTypes)
db.exchangeSells = require(`./exchangeSellModel`)(sequelize, DataTypes)
db.giftCards = require(`./giftCardModel`)(sequelize, DataTypes)
db.withdrawals = require(`./withdrawalModel`)(sequelize, DataTypes)


//One to Many relationships
db.users.hasMany(db.exchangeBuys, { foreignKey: 'userid', as: "crypto_buyers" })
db.users.hasMany(db.exchangeSells, { foreignKey: 'userid', as: "crypto_sellers" })
db.users.hasMany(db.giftCards, { foreignKey: 'userid', as: "gift_sellers" })
db.users.hasMany(db.withdrawals, { foreignKey: 'userid', as: "user_withdrawals" })
db.users.hasOne(db.wallets, { foreignKey: 'user', as: "user_wallets" })
db.users.hasOne(db.banks, { foreignKey: 'user', as: "user_banks" })
db.users.hasOne(db.kyc, { foreignKey: 'user', as: "user_kycs" })
db.users.hasMany(db.profitTools, { foreignKey: 'user', as: "user_tools" })

// One to One relationships
db.exchangeBuys.belongsTo(db.users, { foreignKey: 'userid', as: "crypto_buyer" })
db.exchangeSells.belongsTo(db.users, { foreignKey: 'userid', as: "crypto_seller" })
db.giftCards.belongsTo(db.users, { foreignKey: 'userid', as: "gift_seller" })
db.withdrawals.belongsTo(db.users, { foreignKey: 'userid', as: "user_withdrawal" })
db.wallets.belongsTo(db.users, { foreignKey: 'user', as: "user_wallet" })
db.banks.belongsTo(db.users, { foreignKey: 'user', as: "user_bank" })
db.kyc.belongsTo(db.users, { foreignKey: 'user', as: "user_kyc" })
db.profitTools.belongsTo(db.users, { foreignKey: 'user', as: "tool_user" })

db.sequelize.sync({ force: false }).then(() => console.log('Tables synced'))
    .catch((error) => console.log(error))
module.exports = db
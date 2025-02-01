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
db.transactions = require('./transactionModel')(sequelize, DataTypes)
db.profitTools = require('./profitToolsModel')(sequelize, DataTypes)
db.airdrops = require('./airdropModel')(sequelize, DataTypes)
db.blogs = require('./blogModel')(sequelize, DataTypes)
db.kyc = require('./kycModel')(sequelize, DataTypes)
db.toolsOrders = require('./toolOrderModel')(sequelize, DataTypes)
db.banks = require('./bankModel')(sequelize, DataTypes)
db.utils = require('./utilsModel')(sequelize, DataTypes)

db.sequelize.sync({ force: false }).then(() => console.log('Tables synced'))
    .catch((error) => console.log(error))
module.exports = db
require('dotenv').config()
const express = require('express')
const http = require('http')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const compression = require('compression')
const cloudinary = require('cloudinary').v2

const app = express()
const port = process.env.PORT
const server = http.createServer(app)

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://moniequest.vercel.app', 'https://moniequest-front.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true
}))

app.use(
    compression({
        level: 6,
        threshold: 100 * 1000,
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false
            }
            return compression.filter(req, res)
        }
    })
)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(express.json())
app.use(fileUpload())
const isprod = process.env.NODE_ENV === 'production'
if (!isprod) {
    app.use(express.static('public'))
}

app.use('/api/user', require('./routes/userRoute'))
app.use('/api/notification', require('./routes/notificationRoute'))
app.use('/api/transactions', require('./routes/transactionRoutes'))
app.use('/api/admin', require('./routes/adminRoute'))
app.use('/api/product', require('./routes/productRoute'))

server.listen(port, () => console.log(`Server running on http://localhost:${port}`))

require('dotenv').config()
const express = require('express')
const http = require('http')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()
const port = process.env.PORT
const server = http.createServer(app)

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174']
}))
app.use(express.json())
app.use(fileUpload())
app.use(express.static('public'))

app.use('/api/user', require('./routes/userRoute'))
app.use('/api/notification', require('./routes/notificationRoute'))

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))

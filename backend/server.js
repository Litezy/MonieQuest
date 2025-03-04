require('dotenv').config()
const express = require('express')
const http = require('http')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()
const port = process.env.PORT
const server = http.createServer(app)


const allowedOrigins = [
    'https://moniequest.vercel.app',
    'http://localhost:5173','http://localhost:5174','http://localhost:5175' 
  ];
  
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS','PUT','DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If cookies are sent (myappcookie)
  }));
app.use(express.json())
app.use(fileUpload())
app.use(express.static('public'))

app.use('/api/user', require('./routes/userRoute'))
app.use('/api/notification', require('./routes/notificationRoute'))
app.use('/api/transactions', require('./routes/transactionRoutes'))
app.use('/api/admin', require('./routes/adminRoute'))
app.use('/api/product', require('./routes/productRoute'))

server.listen(port, () => console.log(`Server running on http://localhost:${port}`))

require('dotenv').config();
const express = require('express');
const http = require('http');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const compression = require('compression');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = process.env.PORT;

// 1. CORS First with proper configuration
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // List of allowed origins
        const allowedOrigins = [
            /^http:\/\/localhost:(5173|5174|5175)$/, // Localhost ports
            /\.vercel\.app$/, // Any Vercel app domain
            'https://moniequest.com', 
            'https://www.moniequest.com',
        ];

        // Check if origin matches any allowed pattern
        if (allowedOrigins.some(pattern => {
            if (typeof pattern === 'string') return origin === pattern;
            if (pattern instanceof RegExp) return pattern.test(origin);
            return false;
        })) {
            return callback(null, true);
        }

        // Reject requests from other origins
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200 // For legacy browser support
}));

// Handle preflight requests for all routes
app.options('*', cors());

// 2. Other middlewares
app.use(compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) return false;
        return compression.filter(req, res);
    }
}));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const isprod = process.env.NODE_ENV === 'production';
if (!isprod) {
    app.use(express.static('public'));
}

// Routes
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/notification', require('./routes/notificationRoute'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/admin', require('./routes/adminRoute'));
app.use('/api/product', require('./routes/productRoute'));
app.use('/api/paystack', require('./routes/paystackRoutes'));

const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
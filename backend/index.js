require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());
app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'PlugMail API is running' });
});

// API Routes
app.use('/api/user', require('./src/routes/user'));
app.use('/api/keys', require('./src/routes/keys'));
app.use('/api/accounts', require('./src/routes/accounts'));
app.use('/api/templates', require('./src/routes/templates'));
app.use('/api/analytics', require('./src/routes/analytics'));
app.use('/api/send', require('./src/routes/send'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

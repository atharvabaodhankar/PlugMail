require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS — strict for dashboard, open for public API
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

const dashboardCors = cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true
});

const publicCors = cors(); // Allows all origins — for client API usage

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

// Dashboard Routes (restricted CORS — only plugmail.me + localhost)
app.use('/api/user', dashboardCors, require('./src/routes/user'));
app.use('/api/keys', dashboardCors, require('./src/routes/keys'));
app.use('/api/accounts', dashboardCors, require('./src/routes/accounts'));
app.use('/api/templates', dashboardCors, require('./src/routes/templates'));
app.use('/api/analytics', dashboardCors, require('./src/routes/analytics'));

// Public API Routes (open CORS — clients can call from anywhere)
app.use('/api/send', publicCors, require('./src/routes/send'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

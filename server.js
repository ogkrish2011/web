const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Submit payment (manual verification)
app.post('/submit-payment', async (req, res) => {
  const { plan, members, price, transactionId, purchaserName, purchaserDiscord } = req.body;
  const owner = purchaserName || 'Unknown';
  const discordUser = purchaserDiscord || 'Unknown';

  // Send Discord notification
  const message = {
    content: `💰 Payment Submitted!\n**Customer:** ${owner} (${discordUser})\n**Plan:** ${plan}\n**Members:** ${members}\n**Amount:** ₹${price}\n**Transaction ID:** ${transactionId}\nPlease verify the payment manually.`,
  };

  try {
    await axios.post(process.env.DISCORD_WEBHOOK_URL, message);
    res.json({ success: true });
  } catch (error) {
    console.error('Discord error:', error?.response?.status, error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// Route without .html for payment
app.get('/payment', (req, res) => {
  res.sendFile('payment.html', { root: __dirname });
});

// Optional alias for /payment/ with slash
app.get('/payment/', (req, res) => {
  res.sendFile('payment.html', { root: __dirname });
});

// Optional: route alias for homepage
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Generic route mapping /page to page.html
app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  if (['submit-payment', 'payment', 'api', 'create-order', 'webhook'].includes(page)) {
    return next();
  }

  const filePath = `${page}.html`;
  res.sendFile(filePath, { root: __dirname }, (err) => {
    if (err) {
      next();
    }
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).sendFile('404.html', { root: __dirname });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
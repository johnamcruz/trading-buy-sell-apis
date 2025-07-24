const express = require('express');
const ngrok = require('ngrok');
const tradeRoutes = require('./routes/trade');
const { printAccounts } = require('./services/accountService');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', tradeRoutes);

(async () => {
  try {
    // Start local server
    app.listen(port, async () => {
      console.log(`📦 Buy/Sell API running locally at: http://localhost:${port}\n`);

      // Connect Ngrok
      const url = await ngrok.connect({
        addr: port
      });

      console.log(`🚀 Ngrok tunnel established: ${url}/api\n`);
      console.log(`✅ Ready to receive TradingView webhooks at:\n •  ${url}/api/enter\n •  ${url}/api/exit\n`);
      await printAccounts()
    });
  } catch (err) {
    console.error('Failed to start Ngrok:', err);
    process.exit(1);
  }
})();

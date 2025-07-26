const express = require('express');
const tradeRoutes = require('./routes/trade');
const ngrok = require('ngrok');
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

      // Start Cloudflare Tunnel
      const url = await ngrok.connect({
        addr: port
      });

      console.log(`🚀 tunnel established: ${url}/api\n`);
      const buyUrl = `${url}/api/enter?side=0&accountId=${process.env.DEFAULT_ACCOUNTID}&contractId=${process.env.DEFAULT_CONTRACTID}&size=1 (Buy)\n`
      const sellUrl = `${url}/api/enter?side=1&accountId=${process.env.DEFAULT_ACCOUNTID}&contractId=${process.env.DEFAULT_CONTRACTID}&size=1 (Sell)\n`
      const exitUrl = `${url}/api/exit?accountId=${process.env.DEFAULT_ACCOUNTID}&contractId=${process.env.DEFAULT_CONTRACTID} (Exit)\n`
      console.log(`✅ Ready to receive TradingView webhooks at:\n • ${buyUrl} • ${sellUrl} • ${exitUrl}`);
      await printAccounts()
    });
  } catch (err) {
    console.error('❌ Failed to start tunnel:', err);
    process.exit(1);
  }
})();

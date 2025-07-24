const express = require('express');
const tradeRoutes = require('./routes/trade');
const { printAccounts } = require('./services/accountService');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', tradeRoutes);

app.listen(port, async () => {
  console.log(`📦 Buy/Sell API running locally at: http://localhost:${port}\n`);
  await printAccounts()
});

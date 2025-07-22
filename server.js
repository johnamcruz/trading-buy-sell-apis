const express = require('express');
const tradeRoutes = require('./routes/trade');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', tradeRoutes);

app.listen(port, () => {
  console.log(`Buy/Sell API running at http://localhost:${port}`);
});

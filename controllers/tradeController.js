const { apiRequest }  = require('../utils/apiClient');
const { openPosition, SIDE } = require('../services/orderService');

exports.buy = async (req, res) => {
  try {
    const accountId = parseInt(req.body.accountId, 10);
    const size = parseInt(req.body.size, 10) || 1;
    await openPosition(accountId, req.body.contractId, SIDE.BUY, size)
    res.json({ message: 'Sell order placed.' });
  } catch(error) {
    console.error("Buy error:", error.message);
    res.status(500).json({ error: 'Buy failed' });
  }
};

exports.sell = async (req, res) => {
   try {
    const accountId = parseInt(req.body.accountId, 10);
    const size = parseInt(req.body.size, 10) || 1;
    await openPosition(accountId, req.body.contractId, SIDE.SELL, size)
    res.json({ message: 'Sell order placed.' });
  } catch(error) {
    console.error("Sell error:", error.message);
    res.status(500).json({ error: 'Sell failed' });
  }
};

exports.exit = async (req, res) => {
  try {
    const accountId = parseInt(req.body.accountId, 10);
    const response = await apiRequest('POST', '/Position/searchOpen', { accountId: accountId });

    const body = {
        "accountId": accountId,
        "contractId": req.body.contractId
    };
    const result = await apiRequest('POST', '/Position/closeContract', body);
    console.log(result.data)
    res.json({ message: 'Sell order placed.' });

  } catch(error) {
    console.error("Buy error:", error.message);
    res.status(500).json({ error: 'Exit failed' });
  }
};

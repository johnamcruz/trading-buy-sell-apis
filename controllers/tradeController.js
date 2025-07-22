const { apiRequest }  = require('../utils/apiClient');
const { openPosition, SIDE } = require('../services/orderService');

exports.enter = async (req, res) => {
   try {
    const accountId = req.query.accountId;
    const contractId = req.query.contractId;
    const side = parseInt(req.query.side, 10) || 0;
    if (!accountId || !contractId || (side !== 0 && side !== 1)) {
      return res.status(400).json({ error: 'Missing or invalid query parameters' });
    }

    const type = side == SIDE.BUY ? "Buy" : "Sell"
    const size = parseInt(req.query.size, 10) || 1;
    await openPosition(accountId, contractId, side, size)
    res.json({ message: `${type} order placed.` });
  } catch(error) {
    console.error(`${type} error:`, error.message);
    res.status(500).json({ error: `${type} failed` });
  }
};

exports.exit = async (req, res) => {
  try {
    const accountId = req.query.accountId;
    const contractId = req.query.contractId;
    if (!accountId || !contractId) {
      return res.status(400).json({ error: 'Missing or invalid query parameters' });
    }

    const response = await apiRequest('POST', '/Position/searchOpen', { accountId: accountId });

    const body = {
        "accountId": accountId,
        "contractId": contractId
    };
    const result = await apiRequest('POST', '/Position/closeContract', body);
    console.log(result.data)
    res.json({ message: 'Exit failed' });

  } catch(error) {
    console.error("Buy error:", error.message);
    res.status(500).json({ error: 'Exit failed' });
  }
};

const { apiRequest }  = require('../utils/apiClient');

// Order side enum: 0 = Buy, 1 = Sell
const SIDE = {
  BUY: 0,
  SELL: 1
};

async function openPosition(accountId, contractId, side, size) {
    const response = await apiRequest('POST', '/Position/searchOpen', { accountId: accountId });
    const isEmpty = !response.positions || response.positions.length === 0 || response.positions.every(pos => pos.size === 0);

    if (isEmpty) {
        const order = {
            "accountId": accountId,
            "contractId": contractId,
            "type": 2, // Market order
            "side": side,
            "size": size
        }
        const response = await apiRequest('POST', '/Order/place', order);
        return {
            accountId: accountId,
            contractId: contractId,
            orderId: response.data.orderId,
            size: size
        }
    } else {
        console.log("Position already exists. Skipping order.")
        return {}
    }
}

module.exports = { SIDE, openPosition };
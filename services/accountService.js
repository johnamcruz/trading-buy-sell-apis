const { apiRequest } = require('../utils/apiClient');

async function printAccounts() {
    const response = await apiRequest('POST', '/Account/search', { "onlyActiveAccounts": true });
    console.log(`✅ Found ${response.data.accounts.length} active accounts:`)
    response.data.accounts.forEach(account => {
        console.log(` • ID: ${account.id} - ${account.name}`);
    });
}

module.exports = { printAccounts };
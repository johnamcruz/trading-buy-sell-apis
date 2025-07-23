// utils/apiClient.js
const axios = require('axios');

// Optional: handle auth token if needed
let accessToken = null;

async function getAccessToken() {
  if (accessToken && await validate()) return accessToken;

  const body = {
    userName: process.env.API_USER,
    apiKey: process.env.API_KEY,
  };
  const headers = {
    "Accept": "text/plain",
    "content-type": "application/json"
  };

  const response = await axios.post(`${process.env.API_URL}/Auth/loginKey`, body, headers);

  accessToken = response.data.token;
  return accessToken;
}

async function validate() {
   const response = await apiRequest('POST', '/Auth/validate');
   return response.status == 200
}

async function apiRequest(method, endpoint, data = null) {
  const token = await getAccessToken();

  const config = {
    method,
    url: `${process.env.API_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept": "text/plain",
      "content-type": "application/json"
    },
  };

  if (data) {
    config.data = data;
  }

  return axios(config);
}

module.exports = {
  apiRequest,
  getAccessToken
};

const axios = require('axios');
const axiosRetry = require('axios-retry').default;

// Configure Axios instance with timeout and retries
const axiosInstance = axios.create({
  timeout: 5000, // 5 seconds timeout
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) ||
    error.response?.status >= 500,
});

// Token cache and refresh lock
let accessToken = null;
let tokenRefreshing = null;

// Returns a valid access token, refreshing if needed
async function getAccessToken() {
  if (accessToken && await validateToken()) return accessToken;

  if (tokenRefreshing) {
    // Wait for the current refresh to finish
    return tokenRefreshing;
  }

  tokenRefreshing = refreshToken();
  try {
    accessToken = await tokenRefreshing;
  } finally {
    tokenRefreshing = null;
  }

  return accessToken;
}

// Performs the token refresh
async function refreshToken() {
  const body = {
    userName: process.env.API_USER,
    apiKey: process.env.API_KEY,
  };

  const headers = {
    "Accept": "text/plain",
    "Content-Type": "application/json"
  };

  try {
    const response = await axiosInstance.post(
      `${process.env.API_URL}/Auth/loginKey`,
      body,
      { headers }
    );

    return response.data.token;
  } catch (error) {
    console.error("[Auth] Token refresh failed:", error.message);
    throw new Error("Unable to authenticate");
  }
}

// Validates the current access token directly
async function validateToken() {
  if (!accessToken) return false;

  try {
    const response = await axiosInstance.post(
      `${process.env.API_URL}/Auth/validate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Accept": "text/plain",
          "Content-Type": "application/json"
        }
      }
    );
    return response.status === 200;
  } catch (error) {
    return false; // Assume invalid token on error
  }
}

// General-purpose API request
async function apiRequest(method, endpoint, data = null) {
  const token = await getAccessToken();

  const config = {
    method,
    url: `${process.env.API_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept": "text/plain",
      "Content-Type": "application/json"
    },
    data,
  };

  try {
    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    console.error(`[API Request] ${method} ${endpoint} failed:`, error.message);
    throw error;
  }
}

module.exports = {
  apiRequest,
  getAccessToken
};

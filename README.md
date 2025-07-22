# 📦 Trading Buy/Sell APIs – Installation & Running Guide

This project provides simple trading-related buy/sell API endpoints using Node.js and Express. It is designed to be wired up as **webhooks for TradingView and TrendSpider alerts**. Follow the steps below to install dependencies, configure the project, and run the server locally.

## ✅ Prerequisites

Make sure you have the following installed on your machine:

* **Node.js** (v14 or later recommended)
  👉 Download from: [https://nodejs.org/](https://nodejs.org/)
* **npm** (comes with Node.js)
* (Optional but helpful) **Postman or cURL** to test API endpoints
* (Optional but recommended) **[ngrok](https://ngrok.com/)** to expose your local server for webhook testing

---

## 🚀 Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/johnamcruz/trading-buy-sell-apis.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd trading-buy-sell-apis
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **(Optional) Configure environment variables**

   If the project uses environment variables (noted via `process.env` in code), create a `.env` file in the root directory and set any required keys.
   *Note: This specific project doesn't appear to use any environment variables as of now.*

---

## ▶️ Run the Application

To start the server:

```bash
npm start
```

By default, the server runs on **[http://localhost:3000](http://localhost:3000)**

---

## 🌐 Expose Localhost with Ngrok (for Webhooks)

To receive webhook requests from TradingView or TrendSpider, your local server must be accessible over the internet. Use **ngrok** to create a public HTTPS URL that tunnels to your localhost:

1. **Install ngrok** (if not already installed):

   ```bash
   npm install -g ngrok
   ```

2. **Start ngrok**:

   ```bash
   ngrok http 3000
   ```

3. **Copy the HTTPS URL** displayed by ngrok (e.g., `https://abcd1234.ngrok.io`) and use it in your TradingView or TrendSpider webhook configuration:

   * For buy alert: `https://abcd1234.ngrok.io/buy`
   * For sell alert: `https://abcd1234.ngrok.io/sell`

---

## 🧪 Available API Endpoints

You can test the following routes after starting the server:

* `POST /buy`
  Place a buy order.

* `POST /sell`
  Place a sell order.

* `GET /transactions`
  Get a list of all buy/sell transactions.

**Example `curl` request:**

```bash
curl -X POST http://localhost:3000/buy \
     -H "Content-Type: application/json" \
     -d '{"symbol": "AAPL", "quantity": 5}'
```

---

## 🛠 Project Structure Overview

```
trading-buy-sell-apis/
├── routes/
│   └── transactionRoutes.js       # API route handlers
├── controllers/
│   └── transactionController.js   # Logic for buy/sell actions
├── models/
│   └── transactionModel.js        # In-memory transaction data
├── app.js                         # Express app setup
└── package.json                   # Project metadata and dependencies
```

---

## 📬 Notes

* This is a **basic in-memory API** — data is lost when the server restarts.
* Great for learning or testing small trading logic flows.
* No external database or persistent storage is used.
* **Designed to receive alerts as JSON webhooks from TradingView and TrendSpider.**

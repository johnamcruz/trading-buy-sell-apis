# 📦 Trading Buy/Sell APIs – Installation & Running Guide

This project provides simple trading-related buy/sell API endpoints for ProjectX APIs using Node.js and Express. It is designed to be wired up as **webhooks for TradingView and TrendSpider alerts**. Follow the steps below to install dependencies, configure the project, and run the server locally.

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

   The project uses environment variables, create a `.env` file in the root directory and set any required keys for the following: API_KEY, API_URL, and API_USER

---

## ▶️ Run the Application

To start the server:

```bash
npm run dev
```

To start the server with Ngrok Tunnel:

```bash
npm run tunnel
```

This command will:

- Launch the Express server locally on port `3000`
- Automatically establish a public ngrok tunnel to your local server
- Display the public ngrok URL you can use to send TradingView webhooks

---

## 🧪 Available API Endpoints

You can test the following routes after starting the server:

* `POST /enter`
  Place a buy or sell order.

* `POST /exit`
  Exit current position.

**Example `curl` request:**

```bash
curl -X POST http://localhost:3000/api/enter
```

---

## 📬 Notes

* This is a **basic in-memory API** — data is lost when the server restarts.
* Great for learning or testing small trading logic flows.
* No external database or persistent storage is used.
* **Designed to receive alerts as JSON webhooks from TradingView and TrendSpider.**

---

## Support This Project ❤️
If you find this project useful, consider signing up for Alpha Futures using my [affiliate link](https://app.alpha-futures.com/signup/John004077/). It helps support future development!

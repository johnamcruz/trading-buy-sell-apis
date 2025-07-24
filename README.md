# 📦 Trading Buy/Sell APIs – Installation & Running Guide

This project provides simple trading-related buy/sell API endpoints for ProjectX APIs using Node.js and Express. It is designed to be wired up as **webhooks for TradingView and TrendSpider alerts**. Follow the steps below to install dependencies, configure the project, and run the server locally.

## ✅ Prerequisites

Make sure you have the following installed on your machine:

* **Node.js** (v14 or later recommended)
  👉 Download from: [https://nodejs.org/](https://nodejs.org/)
* **npm** (comes with Node.js)
* (Optional but helpful) **Postman or cURL** to test API endpoints

---

## 🚀 Installation Steps

### 🖥 macOS & Linux: Run `setup.sh`  
### 🪟 Windows: Run `setup.ps1`

---

### 1. Run the setup script

Use the appropriate script for your system:

#### macOS/Linux:
```bash
bash setup.sh
```

#### Windows (Run in PowerShell as Administrator):
```powershell
.\setup.ps1
```

This script will:

- Check for and install required tools (Git, Node.js)
- Clone the project repository
- Install all dependencies via `npm install`
- Set up a `.env` file if `.env.example` exists

---

### 2. Configure environment variables

After the script completes, update the `.env` file located in the project root.

If a `.env.example` file exists, it will be copied automatically.

Set the required variables:

```env
API_KEY=your_api_key_here
API_URL=https://your.api.url
API_USER=your_api_user
```

> 💡 These values are required for the application to run properly.

---

## ▶️ Run the Application

To start the server:

```bash
npm run dev
```

To start the server with http Tunnel:

```bash
npm run tunnel
```

This command will:

- Launch the Express server locally on port `3000`
- Automatically establish a public http tunnel to your local server
- Display the public http URL you can use to send TradingView webhooks

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

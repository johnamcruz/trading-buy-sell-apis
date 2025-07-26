# 🚀 AutoTrade Connector  
**Turn Your TradingView Alerts into Live Trades on TopstepX — Running Safely on Your Own Machine**

---

## 🎯 What It Is  
AutoTrade Connector is a simple webhook service that links your **TradingView alerts** directly to **TopstepX** for automatic trade execution — and it runs **locally on your computer**.

You stay in full control. No cloud servers, no third-party hosting.

---

## 🔧 How It Works
1. **Download and run the connector** locally (lightweight nodeJS app).
2. **Set up an alert** in TradingView using your custom webhook URL.
3. **Your alert fires** (e.g. MACD crossover, breakout, etc.).
4. **The local bot receives it**, processes it, and sends the trade to **TopstepX**.
5. ✅ Your trade is placed — automatically and securely from your machine.

---

## ✅ Why Use It?
- **Runs 100% on your computer** (you own the execution)
- **No coding or cloud setup required**
- **Fast, reliable trade execution**
- **Works with ANY TradingView indicator**
- **Private and secure** — no one sees your strategy or signals but you

---

## 🛠️ What You Need to Use It
- A TradingView account with alert capabilities
- A ProjectX API key from: [https://dashboard.projectx.com](https://dashboard.projectx.com)
- A TopstepX account (or paper trading account)
- A computer (Windows, Mac, or Linux) to run the connector
- A strategy or indicator that gives clear buy/sell alerts

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

To start the server with http tunnel:

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

## Support This Project ❤️
If you find this project useful, consider signing up for Alpha Futures using my [affiliate link](https://app.alpha-futures.com/signup/John004077/). It helps support future development!

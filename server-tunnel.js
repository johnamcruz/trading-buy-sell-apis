const express = require('express');
const tradeRoutes = require('./routes/trade');
const { printAccounts } = require('./services/accountService');
const { spawn } = require('child_process');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', tradeRoutes);

function startCloudflareTunnel(port) {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    const cloudflaredPath = require.resolve('cloudflared/bin/cloudflared'); // use path if locally installed

    const tunnel = spawn(cloudflaredPath, ['tunnel', '--url', `http://localhost:${port}`]);

    let resolved = false;

    const handleOutput = (output) => {
      const text = output.toString();
      const match = text.match(/https:\/\/[a-z0-9\-]+\.trycloudflare\.com/);
      if (match && !resolved) {
        resolved = true;
        // ✅ Only print the URL — clean!
        console.log(`🚀 Cloudflare Tunnel URL: ${match[0]}`);
        resolve({ url: match[0], process: tunnel });
      }
    };

    tunnel.stderr.on('data', handleOutput); // ✅ only watch stderr for URL
    tunnel.stdout.on('data', () => {});     // ignore stdout

    tunnel.on('error', (err) => {
      reject(new Error(`Cloudflared failed to start: ${err.message}`));
    });

    tunnel.on('close', (code) => {
      if (!resolved) reject(new Error(`Cloudflare tunnel exited with code ${code}`));
    });

    setTimeout(() => {
      if (!resolved) {
        tunnel.kill();
        reject(new Error('Cloudflare tunnel timeout — no URL received'));
      }
    }, 15000); // 15 sec timeout
  });
}


(async () => {
  try {
    // Start local server
    app.listen(port, async () => {
      console.log(`📦 Buy/Sell API running locally at: http://localhost:${port}\n`);

      // Start Cloudflare Tunnel
      const { url } = await startCloudflareTunnel(port);

      console.log(`🚀 Cloudflare Tunnel established: ${url}/api\n`);
      console.log(`✅ Ready to receive TradingView webhooks at:\n •  ${url}/api/enter\n •  ${url}/api/exit\n`);
      await printAccounts()
    });
  } catch (err) {
    console.error('❌ Failed to start Cloudflare Tunnel:', err);
    process.exit(1);
  }
})();

#!/bin/bash

# Clone the repo
git clone https://github.com/johnamcruz/trading-buy-sell-apis.git

# Navigate into the project directory
cd trading-buy-sell-apis || exit

# Install dependencies
npm install

# (Optional) Copy example env file if exists
if [ -f .env.example ]; then
  cp .env.example .env
  echo "Copied .env.example to .env — please update environment variables as needed."
else
  echo "No .env.example file found, remember to create your .env file with necessary variables."
fi

echo "Setup complete! You can now run:"
echo "  npm run dev         # to start the server"
echo "  npm run tunnel      # to start the server with Ngrok tunnel"

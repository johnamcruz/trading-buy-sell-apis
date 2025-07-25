#!/bin/bash

# Check for Node.js and npm
if ! command -v npm &> /dev/null || ! command -v node &> /dev/null; then
  echo "Node.js and npm are not installed. Installing them..."

  # Detect OS
  OS="$(uname)"
  if [[ "$OS" == "Darwin" ]]; then
    # macOS
    if ! command -v brew &> /dev/null; then
      echo "Homebrew not found. Installing Homebrew..."
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    brew install node
  elif [[ "$OS" == "Linux" ]]; then
    # Linux (Debian-based)
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
  else
    echo "Unsupported OS. Please install Node.js and npm manually."
    exit 1
  fi

  echo "Node.js and npm installed successfully."
else
  echo "Node.js and npm are already installed."
fi

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

#!/bin/bash

set -e

echo "Checking for Node.js and npm..."

# Function to add Homebrew to PATH if needed
add_brew_to_path() {
  # Default Homebrew paths depending on architecture
  if [ -d "/opt/homebrew/bin" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [ -d "/usr/local/bin" ]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi
}

# Check for Node.js and npm
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
  echo "Node.js and npm not found. Installing..."

  OS="$(uname)"
  if [[ "$OS" == "Darwin" ]]; then
    # macOS
    if ! command -v brew &> /dev/null; then
      echo "Homebrew not found. Installing Homebrew..."
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi

    add_brew_to_path

    echo "Installing Node.js via Homebrew..."
    brew install node

  elif [[ "$OS" == "Linux" ]]; then
    # Linux (Debian-based)
    echo "Installing Node.js on Linux..."
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

# Show installed versions
echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"

# Clone the repo
if [ ! -d "trading-buy-sell-apis" ]; then
  echo "Cloning the repository..."
  git clone https://github.com/johnamcruz/trading-buy-sell-apis.git
else
  echo "Repository already exists. Skipping clone."
fi

# Navigate into the project directory
cd trading-buy-sell-apis || exit

# Install dependencies
echo "Installing dependencies..."
npm install

# Copy .env.example if it exists
if [ -f .env.example ]; then
  cp -n .env.example .env
  echo "Copied .env.example to .env — update environment variables as needed."
else
  echo "No .env.example file found. Please create a .env file manually."
fi

echo
echo "✅ Setup complete! You can now run:"
echo "  npm run dev         # to start the server"
echo "  npm run tunnel      # to start the server with Ngrok tunnel"

# Navigate into the project directory
cd trading-buy-sell-apis
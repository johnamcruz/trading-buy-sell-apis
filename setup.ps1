function Check-Command($cmd) {
    $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue)
}

function Install-Git {
    Write-Host "Installing Git..."
    $gitInstaller = "$env:TEMP\Git-Setup.exe"
    Invoke-WebRequest -Uri "https://github.com/git-for-windows/git/releases/latest/download/Git-2.44.0-64-bit.exe" -OutFile $gitInstaller
    Start-Process -FilePath $gitInstaller -ArgumentList "/VERYSILENT" -Wait
    Remove-Item $gitInstaller
    Write-Host "Git installation complete."
}

function Install-NodeJS {
    Write-Host "Installing Node.js..."
    $nodeInstaller = "$env:TEMP\node-setup.msi"
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.12.2/node-v20.12.2-x64.msi" -OutFile $nodeInstaller
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$nodeInstaller`" /quiet /norestart" -Wait
    Remove-Item $nodeInstaller
    Write-Host "Node.js installation complete."
}

function Wait-For-PathUpdate {
    # Refresh PATH for current session
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" +
                [System.Environment]::GetEnvironmentVariable("Path","User")
}

# Ensure script is running as admin
If (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(`
    [Security.Principal.WindowsBuiltInRole] "Administrator"))
{
    Write-Host "This script needs to run as Administrator. Restarting with elevated privileges..."
    Start-Process powershell "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

# Check Git
if (-not (Check-Command "git")) {
    Install-Git
    Wait-For-PathUpdate
} else {
    Write-Host "Git is already installed."
}

# Check Node.js (and npm)
if (-not (Check-Command "npm")) {
    Install-NodeJS
    Wait-For-PathUpdate
} else {
    Write-Host "Node.js and npm are already installed."
}

# Clone repo
$repo = "https://github.com/johnamcruz/trading-buy-sell-apis.git"
$folder = "trading-buy-sell-apis"

if (-not (Test-Path $folder)) {
    git clone $repo
} else {
    Write-Host "Repo already cloned. Skipping git clone."
}

# Move into repo
Set-Location $folder

# Install dependencies
npm install

# Copy .env.example to .env
if (Test-Path ".env.example" -and -not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Copied .env.example to .env — please update environment variables as needed."
} elseif (-not (Test-Path ".env.example")) {
    Write-Host "No .env.example file found. Please create a .env manually."
} else {
    Write-Host ".env file already exists. Skipping copy."
}

Write-Host "`n✅ Setup complete!"
Write-Host "You can now run:"
Write-Host "  npm run dev         # to start the server"
Write-Host "  npm run tunnel      # to start the server with Ngrok tunnel"

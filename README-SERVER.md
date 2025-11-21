# Local Development Server

This guide will help you run your website locally so you can preview changes before pushing them.

## Quick Start

### Option 1: Using the Batch File (Easiest)
1. Double-click `start-server.bat`
2. Your website will open at `http://localhost:8000`
3. Press `Ctrl+C` to stop the server

### Option 2: Using PowerShell
1. Right-click `start-server.ps1` and select "Run with PowerShell"
2. If you get a security error, run this first:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Your website will open at `http://localhost:8000`
4. Press `Ctrl+C` to stop the server

## Manual Methods

### Using Python (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python2 -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

### Using Node.js (if installed)
```bash
# Install http-server globally (first time only)
npm install -g http-server

# Start the server
http-server -p 8000 -o
```

The `-o` flag automatically opens your browser.

## Troubleshooting

### "Python is not recognized"
- Install Python from https://www.python.org/downloads/
- Make sure to check "Add Python to PATH" during installation

### "Node is not recognized"
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### PowerShell Script Won't Run
- Open PowerShell as Administrator
- Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Try running the script again

## Tips

- The server will automatically reload when you make changes to your files
- Keep the server running while you edit your files
- Use `http://localhost:8000` to view your site
- Press `Ctrl+C` in the terminal to stop the server


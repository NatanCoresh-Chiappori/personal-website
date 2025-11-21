@echo off
echo Starting local development server...
echo.
echo Your website will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try Python 3 first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python...
    python -m http.server 8000
    goto :end
)

REM Try Python 2
python2 --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python 2...
    python2 -m SimpleHTTPServer 8000
    goto :end
)

REM If Python is not available, try Node.js http-server
where node >nul 2>&1
if %errorlevel% == 0 (
    echo Python not found. Trying Node.js...
    echo Installing http-server globally (if not already installed)...
    npm install -g http-server >nul 2>&1
    echo Starting http-server...
    http-server -p 8000 -o
    goto :end
)

echo.
echo ERROR: Neither Python nor Node.js found!
echo.
echo Please install one of the following:
echo   1. Python: https://www.python.org/downloads/
echo   2. Node.js: https://nodejs.org/
echo.
echo Or use the PowerShell script: start-server.ps1
echo.
pause

:end


@echo off
echo ================================
echo  D^&D Beyond Party View Proxy
echo ================================

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b
)

:: Check for package.json
if not exist "package.json" (
    echo [ERROR] No package.json found in this folder.
    echo Make sure you run this script from the root of the project directory.
    pause
    exit /b
)

:: Check if node_modules exists
if exist "node_modules" (
    echo Dependencies already installed.
) else (
    echo node_modules folder not found.
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies. Check your internet connection or npm configuration.
        pause
        exit /b
    )
    echo Dependencies installed successfully.
)

:: Start the server
echo Starting server...
node server.js

echo.
echo Server stopped. Press any key to close.
pause

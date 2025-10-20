@echo off
echo ================================
echo  Starting Party View Proxy
echo ================================

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/ before running this script.
    pause
    exit /b
)

:: Start the server
echo Launching server...
node server.js

pause

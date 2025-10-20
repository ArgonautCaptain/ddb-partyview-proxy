# 🛡️ D&D Beyond Party View Proxy (Local)

A lightweight local API proxy for the [**ddb-party-view symbiote**](https://github.com/PanoramicPanda/ddb-party-view) used with [**TaleSpire**](https://bouncyrock.com/talespire). This proxy allows the symbiote to fetch live character data directly from [**D&D Beyond**](https://www.dndbeyond.com/) by hosting a simple local endpoint with proper CORS headers.

> ⚠️ **Note:** This project is not affiliated with Wizards of the Coast, D&D Beyond, BouncyRock, or PanoramicPanda. It’s a community-driven helper tool designed for personal, non-commercial use.

---

## 📖 About

The [**ddb-party-view**](https://github.com/PanoramicPanda/ddb-party-view) symbiote enhances TaleSpire by displaying your D&D Beyond party’s stats and status in real time. However, it requires an API endpoint to access D&D Beyond’s character data — something not directly available from your browser due to CORS restrictions.

This local proxy solves that problem. It:

- ✅ Accepts requests from the symbiote like `http://localhost:3000/api?character=48690485`  
- 🔄 Forwards them to the official D&D Beyond character API  
- 🌐 Returns the character JSON with CORS enabled so the symbiote can use it  
- 🧰 Runs locally — no cloud services, no database, no external hosting required

---

## 🚀 Features

- 🔧 Zero configuration – just install and run  
- 🪶 Lightweight – powered by Express.js  
- 🌍 Fully CORS-enabled – compatible with browser-based requests  
- 🧪 Compatible with [PanoramicPanda’s Party View Symbiote](https://github.com/PanoramicPanda/ddb-party-view)

---

## 📦 Installation

1. **Clone this repository:**

```bash
git clone https://github.com/YOUR_USERNAME/ddb-partyview-proxy.git
cd ddb-partyview-proxy
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the server:**

```bash
node server.js
```

Or on Windows, simply double-click:

```
start-server.bat
```

---

## ⚙️ Usage

Once running, your proxy endpoint will be available at:

```
http://localhost:3000/api
```

The Party View Symbiote will automatically append `?character=<id>` to this URL.

### ✅ Example Request

Test it manually by visiting this URL in your browser:

```
http://localhost:3000/api?character=48690485
```

If everything is working, you’ll see the raw character JSON returned from D&D Beyond’s API.

---

## 🧪 Symbiote Setup

When configuring the [ddb-party-view](https://github.com/PanoramicPanda/ddb-party-view) symbiote:

- **API Endpoint:** `http://localhost:3000/api`  
- **Character IDs:** Comma-separated list of character IDs from D&D Beyond (e.g., `48690485,12345678`)  
- **Manual AC Bonuses (optional):** Provide as a list of name/bonus pairs if desired.

---

## 📁 File Structure

```
ddb-partyview-proxy/
├─ server.js            # Main proxy server script
├─ package.json         # Node.js project file
├─ start-server.bat     # Windows launcher
└─ README.md            # Documentation (this file)
```

---

## 🛠️ Requirements

- [Node.js](https://nodejs.org/) v16+  
- Internet connection (for D&D Beyond API access)  
- Your D&D Beyond characters must be **public** or owned by your account.

---

## 🧰 start-server.bat

A convenience script is included for Windows users:

```bat
@echo off
echo ================================
echo  D&D Beyond Party View Proxy
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
```

Double-click `start-server.bat` to launch the server.

---

## ⚠️ Notes & Disclaimers

- This proxy is **read-only** and does not store or modify data.  
- It simply retrieves publicly available character JSON from D&D Beyond.  
- All trademarks and copyrights are property of their respective owners.  
- Use of this proxy is at your own risk and should comply with [D&D Beyond’s Terms of Service](https://www.dndbeyond.com/terms).

---

## 🙏 Acknowledgements

- 🧠 **[PanoramicPanda](https://github.com/PanoramicPanda)** – Original creator of the [ddb-party-view](https://github.com/PanoramicPanda/ddb-party-view) symbiote that inspired this proxy.  
- 🐉 **[BouncyRock](https://bouncyrock.com/)** – Developers of [TaleSpire](https://bouncyrock.com/talespire), the virtual tabletop this tool enhances.  
- 🧙‍♂️ **[D&D Beyond](https://www.dndbeyond.com/)** – The source of all character data.

---

## 📜 License

This project is released under the MIT License. See `LICENSE` for details.

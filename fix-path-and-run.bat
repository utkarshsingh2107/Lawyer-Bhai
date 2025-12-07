@echo off
echo ========================================
echo LawyerBhai - Fix PATH and Run Server
echo ========================================
echo.

REM Add Node.js to PATH for this session
set PATH=%PATH%;C:\Program Files\nodejs\

REM Verify Node.js is accessible
echo Checking Node.js installation...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

npm --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm not found!
    pause
    exit /b 1
)

echo.
echo ✓ Node.js and npm are working!
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
    echo.
    echo ✓ Dependencies installed successfully!
    echo.
)

REM Check if .env file exists
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please create .env file with your API keys.
    echo You can copy .env.example to .env
    echo.
    pause
)

echo Starting development server...
echo.
echo Server will be available at: http://localhost:5173
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause

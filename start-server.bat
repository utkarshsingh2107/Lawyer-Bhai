@echo off
cls
echo ========================================
echo   LawyerBhai - Starting Server
echo ========================================
echo.

REM Permanently add Node.js to PATH for this session
set PATH=%PATH%;C:\Program Files\nodejs\

echo [1/3] Checking Node.js...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found!
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
echo [2/3] Checking dependencies...
if not exist "node_modules\" (
    echo Installing dependencies...
    npm install
)

echo.
echo [3/3] Starting development server...
echo.
echo ========================================
echo   Server will be available at:
echo   http://localhost:5173
echo.
echo   Press Ctrl+C to stop the server
echo ========================================
echo.

npm run dev
